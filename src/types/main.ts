export interface JwtPayload {
  tenantId: string;
  sub: string;
  roles: {
    authority: string;
  }[];
  iat: number;
  exp: number;
}

export interface WorkerType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  tenantId: number;
}

export interface CourseType {
  beginningCourseTime: string;
  competence: string;
  courseDescription: string;
  courseName: string;
  creditEKTS: number;
  durationInHours: number;
  endingCourseTime: string;
  id: number;
  linkOfCourseApproval: string;
  programApprovalYear: number;
  programType: string;
  tenantId: number;
}

export interface CoursesType {
  course: CourseType[];
  pdfTemplateId: number;
}

export interface ParticipantType {
  certificateNumber: string;
  courseId: number;
  email: string;
  firstName: string;
  grade: number;
  id: number;
  lastName: string;
  middleName: string;
  phone: string;
  tenantId: number;
}