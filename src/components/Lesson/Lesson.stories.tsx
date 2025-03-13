import { Meta, StoryObj } from '@storybook/react';
import Lesson from './LessonComponent';

const meta: Meta<typeof Lesson> = {
  title: 'Components/Lesson',
  component: Lesson,
};

export default meta;
type Story = StoryObj<typeof Lesson>;

export const Default: Story = {};

