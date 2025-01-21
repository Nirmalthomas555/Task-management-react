export const fetchTasks = async (): Promise<any[]> => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      return await response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  };
  