import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  serviceId: null,
  stepCount:1,
  steps: [
    { id: 1, title: "Job Overview", show: true },
    { id: 2, title: "Pricing and Scopes", show: false },
    { id: 3, title: "Description and FAQ", show: false },
    { id: 4, title: "Gallery", show: false },
    { id: 5, title: "Requirements", show: false },

  ],
  profileSteps:"personal",
  packageName:"basic",
  package:[],
  order:{
    quantity:0,
    cost:0,
  },
  searchValue:'',
  toastMessage:"",
  senderMessage:[],
  notifications:[],
 count:{
  message:0,
  notification:0
 },
name:""

};

export const sellerSlice = createSlice({
  name: "sellerSlice",
  initialState,
  available_date: new Date(),
  reducers: {
    setServiceId: (state, actions) => {
      state.serviceId = actions.payload;
    },
    setProviderService: (state, actions) => {
        state.serviceId = actions.payload;
      },
    setAvailableDate: (state, actions) => {
      state.available_date = actions.payload;
    },
 
    setSteps: (state, actions) => {
      state.steps = actions.payload;
    },
    setStepCount: (state, actions) => {
      state.stepCount = actions.payload;
    },
    setProfileStep: (state, actions) => {
      state.profileSteps = actions.payload;
    },
    setPackageName: (state, actions) => {
      state.packageName = actions.payload;
    },
    setPackage: (state, actions) => {
      state.package = actions.payload;
    },
    setOrderDetails: (state, actions) => {
      state.order = actions.payload;
    },
    setSearchValue: (state, actions) => {
      state.searchValue = actions.payload;
    },
    setToastMessage:(state, actions) => {
      state.toastMessage = actions.payload;
    },
    setSenderMessage:(state, actions) => {
      state.senderMessage = actions.payload;
    },
    setNotifications:(state, actions) => {
      state.notifications = actions.payload;
    },
    setCounts:(state, actions) => {
      state.count = actions.payload;
    },
    setName:(state, actions) => {
      state.name = actions.payload;
    },
  
  },
});
export const {
  setAvailableDate,
  setSteps,
  setServiceId,
  setProviderService,
  setStepCount,
  setProfileStep,
  setPackageName,
  setPackage,
  setOrderDetails,
  setSearchValue,
  setToastMessage,
  setSenderMessage,
  setNotifications,
  setCounts,
  setName
} = sellerSlice.actions;
export default sellerSlice.reducer;
