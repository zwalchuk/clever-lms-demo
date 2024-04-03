import { Student, Section, Assignment, Submission } from '@/app/lib/definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { usePathname } from 'next/navigation';
import { sql } from '@vercel/postgres';


export class CleverDataFetcher {
  token: string;

  constructor(token) {
    this.token = token;
  }

  async fetch(url: string) {
    const res = await fetch(url, {
      headers: {
          'Authorization': 'Bearer ' + this.token,
          'Content-Type': 'application/json'
      },
    });
    
    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }
  async fetchStudents() {
    const students = await this.fetch('https://api.clever.com/v3.0/users/657b35c16a1a3e5c217dcd8b/myStudents');
    return students.data.map((data) => new Student(data.data));
  }

  async fetchSections() {
    noStore();
    const section = await this.fetch('https://api.clever.com/v3.0/users/657b35c16a1a3e5c217dcd8b/sections');
    return section.data.map((data) => new Section(data.data));
  }

  async fetchStudentsInSection() {
    noStore();
    const sectionData = await this.fetchSections();
    const studentsInSection = await this.fetch(`https://api.clever.com/v3.0/sections/${sectionData.id}/students`);
    return studentsInSection.data.map((data) => new Student(data.data));
  }

   /*async fetchAssignments() {
    noStore();
    const assignmentData = await this.fetch(`https://api.clever.com/v3.1/sections/657b35c16a1a3e5c217dcd67/assignments/2c257413-3bb4-428a-b215-98a303f91b4c`)
    return assignmentData.data.map((data) => new Assignment(data.data));
  }*/
}

export default async function fetchAssignments() {
  noStore();
  try {
    const data = await sql<Assignment>`
    SELECT assignments.id, assignments.section_id
    FROM assignments`;

    const assignments = data.rows.map((assignment) => ({
      ...assignment,
    }))
    return assignments;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch assignments for section.');
  }

}

const ITEMS_PER_PAGE = 6;
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

/*
  async createAssignment() {
    // TODO: Implement this
  }

  async getAssignment() {
    noStore();
    const assignment = await this.fetch(`https://api.clever.com/v3.1/sections/${section.id}/assignments/${assignment.id}`)
  }

  async updateAssignment() {
    // TODO: Implement this
  }

  async deleteAssignment() {
    // TODO: Implement this
  }

  async createSubmission() {
    // TODO: Implement this
  }

  async getSubmission() {
    // TODO: Implement this
  }

  async updateSubmission() {
    // TODO: Implement this
  }

  async deleteSubmission() {
    // TODO: Implement this
  }
*/