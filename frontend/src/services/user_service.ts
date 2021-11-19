import axios from 'axios';

const userService = {
  uploadCSV: async (csv: File): Promise<number> => {
    const form = new FormData();
    form.append('users', csv);

    const response = await axios.post('/upload-users', form);

    return response.data.created_users || 0;
  },
};

export default userService;
