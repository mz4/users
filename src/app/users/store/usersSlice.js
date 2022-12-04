import {
  createSlice,
  createSelector,
  createAsyncThunk
} from '@reduxjs/toolkit';

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId) => {
    await fetch(`http://www.localhost:3001/users/${userId}`, {
      method: 'DELETE'
    });
    return { userId };
  }
);

const initialState = {
  users: [],
  filters: {
    sorting: { asc: true },
    parameters: { favorite: false }
  }
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersList(state, action) {
      state.users = action.payload;
    },
    usersListSort(state) {
      state.filters.sorting.asc = !state.filters.sorting.asc;
    },
    filterUsers(state, action) {
      state.filters.parameters.favorite = action.payload.favorite;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const { users } = state;
      const index = users.findIndex(({ id }) => id === action.payload.userId);
      users.splice(index, 1);
    });
  }
});

export const { usersList, usersListSort, filterUsers } = usersSlice.actions;

export default usersSlice.reducer;

export const getUsers = createSelector(
  (state) => state.users.users,
  (users) => {
    return users;
  }
);

export const getTotalUsers = createSelector(
  (state) => state.users.users,
  (users) => {
    return users.length;
  }
);

export const getUsersFilters = createSelector(
  (state) => state.users.filters,
  (filters) => {
    return filters;
  }
);
