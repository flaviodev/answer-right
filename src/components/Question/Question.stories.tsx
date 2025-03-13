import { Meta, StoryObj } from '@storybook/react';
import QuestionComponent from './QuestionComponent';

const meta: Meta<typeof QuestionComponent> = {
  title: 'Components/Question',
  component: QuestionComponent,
};

export default meta;
type Story = StoryObj<typeof QuestionComponent>;

export const Default: Story = {};

