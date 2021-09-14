export interface Answers {
  title: string;
  answers: string[];
}

export interface QuestionRespondProps extends Answers {
  className?: string;
}

export interface ResultProps {
  userId: string;
  surveyCompleted: boolean;
  answerRespond: Answers[];
  onCloseResult: () => void;
}
