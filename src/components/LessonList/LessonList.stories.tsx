import { Meta, StoryObj } from '@storybook/react';
import LessonListComponent from './LessonListComponent';

const meta: Meta<typeof LessonListComponent> = {
  title: 'Components/LessonList',
  component: LessonListComponent,
};

export default meta;
type Story = StoryObj<typeof LessonListComponent>;

export const Default: Story = {};

