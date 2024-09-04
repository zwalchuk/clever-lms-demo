// Clever API and SQL calls

import { Student, Section, Assignment, Submission, AssignmentSql, SectionIdSql } from '@/app/lib/definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { sql } from '@vercel/postgres';

const token = process.env.DAC_TOKEN

export class CleverDataFetcher {

  async fetch(url: string) {
    const res = await fetch(url, {
      headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
      },
    });
    console.log(url)
    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }
  async fetchStudents() {
    const students = await this.fetch('https://api.clever.com/v3.0/users/657b35c16a1a3e5c217dcd8f/myStudents');
    return students.data.map((data) => new Student(data.data));
  }

  async getStudent(user_id: string) {
    const student = await this.fetch(`https://api.clever.com/v3.0/users/${user_id}`);
    return student;
  }

  async fetchSections() {
    noStore();
    const section = await this.fetch('https://api.clever.com/v3.0/users/657b35c16a1a3e5c217dcd8f/sections');
    return section.data.map((data) => new Section(data.data));
  }

   async getAssignment(sectionId: string, assignmentId: string) {
    noStore();
    const assignmentData = await this.fetch(`https://api.clever.com/v3.1/sections/${sectionId}/assignments/${assignmentId}`)
    return assignmentData;
  }

  async getSubmissions(sectionId: string, assignmentId: string) {
    noStore();
    const submissions = await this.fetch(`https://api.clever.com/v3.1/sections/${sectionId}/assignments/${assignmentId}/submissions`)
    for (const submission of submissions.data) {
      const student = await this.fetch(`https://api.clever.com/v3.0/users/${submission.user_id}`);
      submission.name = student.data.name.first + " " + student.data.name.last;
    }
    return submissions;
  }

  async getUserSubmission(sectionId: string, assignmentId: string, userId: string) {
    noStore();
    const submission = await this.fetch(`https://api.clever.com/v3.1/sections/${sectionId}/assignments/${assignmentId}/submissions/${userId}`)
    return submission;
  }
}

//needed to create a new fetchSections, fetchAssignments functions bc classes can't be imported to client side
export async function fetchSections() {
  const res = await fetch('https://api.clever.com/v3.0/users/657b35c16a1a3e5c217dcd8f/sections', {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data
}

export async function fetchAssignments() {
  noStore();
  try {
    const data = await sql<Assignment>`
    SELECT assignments.id, assignments.section_id
    FROM assignments
    LIMIT 6`;

    const assignments = data.rows.map((assignment) => ({
      ...assignment,
    }))
    return assignments;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch assignments.');
  }

}

// this powers the search page for Assignments
const ITEMS_PER_PAGE = 6;

export async function fetchFilteredAssignments(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const assignments = await sql<Assignment>`
    SELECT
      assignments.title,
      assignments.id,
      assignments.section_id
    FROM assignments
    WHERE
      assignments.id ILIKE ${`%${query}%`} OR
      assignments.section_id ILIKE ${`%${query}%`}
    ORDER BY assignments.id DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;

  return assignments.rows
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch assignments.');
    }
}

export async function fetchAssignmentsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM assignments
    WHERE
      assignments.id ILIKE ${`%${query}%`}
    `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of assignments.');
  }
}


//need to use id from params to run these functions:
export async function fetchAssignmentById(id: string) {
  noStore();
  try {
    const data = await sql<AssignmentSql>`
    SELECT
      assignments.id,
      assignments.section_id
    FROM assignments
    WHERE 
      assignments.id = ${id};
    `;

    const assignment = data.rows.map((assignment) => ({
      ...assignment,
    }));
    return assignment[0];
  } catch (error) {
    console.error('Databse Error:', error);
    throw new Error('Failed to fetch assignment.');
  }
}

export async function fetchSectionByAssignmentId(id: string) {
  noStore();
  try {
    const data = await sql<SectionIdSql>`
    SELECT
      assignments.section_id
    FROM assignments
    WHERE assignments.id = ${id};
    `;

    const section = data.rows.map((section) => ({
      ...section,
    }));
    return section[0];
  } catch (error) {
    console.error('Databse Error:', error);
    throw new Error('Failed to fetch section.');
  }
}

/* TODO: 
  async updateSubmission() {
  }

  async deleteSubmission() {
  }
*/