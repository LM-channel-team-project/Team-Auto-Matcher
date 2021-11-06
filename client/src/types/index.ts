export interface Answers {
  title: string;
  answers: string[];
}

export interface IAnyObject {
  [key: string]: any;
}

export type ContentItem = {
  title: string;
  text: string;
};
export type QuestionItem = {
  title: string;
  answers: string[];
};
export type TeamListType = {
  id: string;
  name: string;
};
export type MailType = {
  from: string;
  teamId: string;
  type: string;
  teamName: string;
  date: Date;
};
export type CommentsType = {
  date: Date;
  owner: string;
  comment: string;
  name: string;
}
