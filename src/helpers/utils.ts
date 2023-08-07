export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'All':
      return { color: 'black' };
    case 'High':
      return { color: 'red' };
    case 'Medium':
      return { color: 'Orange' };
    case 'Low':
      return { color: 'green' };
    default:
      return { color: 'green' };
  }
};
