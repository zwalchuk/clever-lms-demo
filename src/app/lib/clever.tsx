import { Student, Section, Assignment, Submission } from '@/app/lib/definitions';

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
    const section = await this.fetch('https://api.clever.com/v3.0/users/657b35c16a1a3e5c217dcd8b/sections');
    return section.data.map((data) => new Section(data.data));
  }

  async createAssignment() {

  }

  async getAssignment() {
    // TODO: Implement this
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
}
