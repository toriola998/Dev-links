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
      let myArray = []
      myArray.push(action.payload)
      state.value = myArray[myArray?.length - 1]
      //state.value.push(action.payload).length - 1;
     // return state.value[state.value.length - 1];
    },
    saveProfile: (state, action) => {
      state.profileDetails = (action.payload);
    },
  },
})

export const { saveLinks, saveProfile } = linksSlice.actions

export default linksSlice.reducer