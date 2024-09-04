// This file contains type definitions for Clever-related data.
export class Student {
  id: string;
  district: string;
  email: string;
  name: Name;
  dob: string;
  gender: string;
  grade: string; 
  school: string;
  sis_id: string;
  state_id: string;
  student_number: string;
  // enrollments: Enrollment;

  constructor(data) {
    this.id = data.id;
    this.name = `${data.name.first} ${data.name.middle} ${data.name.last}`;
    this.district = data.district;
    this.email = data.email;

    // Student-only fields
    this.dob = data.roles.student.dob;
    this.gender = data.roles.student.gender;
    this.grade = data.roles.student.grade;
    this.school = data.roles.student.school;
    this.sis_id = data.roles.student.sis_id;
    this.state_id = data.roles.student.state_id;
    this.student_number = data.roles.student.student_number;
  }
};

export class Section {
  id: string;
  district: string;
  grade: string;
  name: string;
  period: string;
  school: string;
  section_number: string;
  sis_id: string;
  students: string[];
  subject: string; 
  teacher: string;
  teachers: string[];

  constructor(data) {
    this.id = data.id;
    this.district = data.district;
    this.grade = data.grade;
    this.name = data.name;
    this.period = data.period;
    this.school = data.school;
    this.section_number = data.section_number;
    this.sis_id = data.sis_id;
    this.students = data.students;
    this.subject = data.subject; 
    this.teacher = data.teacher;
    this.teachers = data.teachers;
  }
};

export class Assignment {
  id: string;
  section_id: string;
  title: string;
  description: string;
  due_date: string;
  points_possible: Number;
  submission_types: Array<String>;

  constructor(data) {
    this.id = data.id;
    this.section_id = data.section_id;
    this.title = data.title;
    this.description = data.description;
    this.due_date = data.due_date;
    this.points_possible = data.points_possible;
    this.submission_types = data.submission_types;
  }
};

export class Submission {
  id: string;
  assignment_id: string;
  state: string;
  attachments: string[];
  grader_id: string;
  user_id: string;

  constructor(data) {
    this.id = data.id;
    this.assignment_id = data.assignment_id;
    this.state = data.state;
    this.attachments = data.attachments;
    this.grader_id = data.grader_id;
    this.user_id = data.user_id
    
  }
};

export class Attachment {
  type: string;
  title: string;
  description: string;
  URL: string;

  constructor(data) {
    this.type = data.type;
    this.title = data.title;
    this.description = data.description;
    this.URL = data.URL;
  }
}
// the classes above could prob be used instead, but I created these for specific functions in actions.ts
export type AssignmentSql = {
  id: string;
  section_id: string;
  title: string;
};

export type SectionIdSql = {
  section_id: string;
};