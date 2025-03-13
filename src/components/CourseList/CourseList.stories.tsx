import { Meta, StoryObj } from '@storybook/react';
import CourseList from './CourseList';

const meta: Meta<typeof CourseList> = {
  title: 'Components/CourseList',
  component: CourseList,
};

export default meta;
type Story = StoryObj<typeof CourseList>;

export const Default: Story = {};

