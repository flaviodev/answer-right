import { Meta, StoryObj } from '@storybook/react';
import LessonList from './ModuleListComponent';

const meta: Meta<typeof LessonList> = {
  title: 'Components/LessonList',
  component: LessonList,
};

export default meta;
type Story = StoryObj<typeof LessonList>;

export const Default: Story = {};

