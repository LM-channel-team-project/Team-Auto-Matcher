import theme from 'style/theme';

//  Label Colors
export type LabelColors = keyof typeof theme.color.label;

export const skillsLabel: { [key: string]: LabelColors } = {
  react: 'blue',
  apollo: 'red',
  mongodb: 'orange',
  graphql: 'red',
};
