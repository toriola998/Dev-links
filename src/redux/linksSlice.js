import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
  profileDetails: ''
}

export const linksSlice = createSlice({
  name: 'linkList',
  initialState,
  reducers: {
    saveLinks: (state, action) => {
      state.value = (action.payload);
    },
    saveProfile: (state, action) => {
      state.profileDetails = (action.payload);
      console.log(state.profileDetails)
    },
  },
})

export const { saveLinks, saveProfile } = linksSlice.actions

export default linksSlice.reducer