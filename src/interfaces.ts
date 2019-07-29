export interface TeamMember {
  firstName: string;
  lastName: string;
  programId?: string;
  title: string;
  organization: string;
  linkedinLink?: string;
  shortBio?: string;
}

export interface DBTeamMember {
  id: string;
  firstName: string;
  lastName: string;
  programId: string;
  programName: string;
  title: string;
  organization: string;
  linkedinLink?: string;
  shortBio?: string;
  isProgramManager?: boolean;
}

export interface Program {}

export interface DBProgram {}
