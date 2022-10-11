import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { getAllTours,getSingleTour,createTour,getToursByUserId,deleteTours,editTours, searchTours,likeTour,commenttour } from "../Api/Api";


export const getAllTour = createAsyncThunk(
    "tour/gettour",
    async (page, { rejectWithValue }) => {
      try {
        const response = await getAllTours(page);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const singleTour = createAsyncThunk(
    "tour/singletour",
    async (id, { rejectWithValue }) => {
      try {
        const response = await getSingleTour(id);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  

  export const AddTour = createAsyncThunk(
    "tour/addtour",
    async ({toast,navigate,formData}, { rejectWithValue }) => {
      try {
        const response = await createTour(formData);
        toast.success("tour create Successfully");
        navigate("/");
        console.log(response.data)
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const UserTours = createAsyncThunk(
    "tour/usertour",
    async (id, { rejectWithValue }) => {
      try {
        const response = await getToursByUserId(id);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const tourDelete = createAsyncThunk(
    "tour/tourdelete",
    async ({id,toast}, { rejectWithValue }) => {
      try {
        const response = await deleteTours(id);
        toast.success("tour delete Successfully");
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  export const tourEdit = createAsyncThunk(
    "tour/touredit",
    async ({formData,id,toast,navigate}, { rejectWithValue }) => {
      try {
        const response = await editTours(id,formData);
        toast.success("tour update Successfully");
        navigate('/')
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const TourSearch = createAsyncThunk(
    "tour/searchtour",
    async (search, { rejectWithValue }) => {
      try {
        const response = await searchTours(search);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
  export const tourLike = createAsyncThunk(
    "tour/tourlike",
    async (id, { rejectWithValue }) => {
      try {
        const response = await likeTour(id);
        // console.log(response.data)
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const tourComment = createAsyncThunk(
    "tour/comment",
    async ({id,comments}, { rejectWithValue }) => {
      try {
        const response = await commenttour(id,comments);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
const TourSlice= createSlice({
    name:'user',
    initialState:{
        
        error:'',
        loading:false,
        tours:[],
        tour:{},
        userTours:[],
        searchTours:[],
        currentPage:1,
        numberOfPages:'',



    },
    reducers:{
      setCurrentpage :(state,action)=>{
        state.currentPage = action.payload

      }
        

    },
    extraReducers: {

      
        [getAllTour.pending]: (state, action) => {
          state.loading = true;
        },
        [getAllTour.fulfilled]: (state, action) => {
          state.loading = false;
          state.tours = action.payload.data;
          state.currentPage= action.payload.currentPage
          state.numberOfPages = action.payload.nuberOfPages
        },
        [getAllTour.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        [tourComment.pending]: (state, action) => {
          state.loading = true;
        },
        [tourComment.fulfilled]: (state, action) => {
          state.loading = false;
          const {arg:{id}} = action.meta
          state.tour = action.payload
          state.tours = state.tours.map((item)=>item._id==id?action.payload:item)
        },
        [tourComment.rejected]: (state, action) => {
           state.loading = false;
          state.error = action.payload.msg;
        },
        [singleTour.pending]: (state, action) => {
          state.loading = true;
        },
        [singleTour.fulfilled]: (state, action) => {
          state.loading = false;
          state.tour = action.payload;
        },
        [singleTour.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        [AddTour.pending]: (state, action) => {
          state.loading = true;
        },
        [AddTour.fulfilled]: (state, action) => {
          state.loading = false;
          state.tours = [action.payload];
        },
        [AddTour.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        [UserTours.pending]: (state, action) => {
          state.loading = true;
        },
        [UserTours.fulfilled]: (state, action) => {
          state.loading = false;
          state.userTours = action.payload;
        },
        [UserTours.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        [tourDelete.pending]: (state, action) => {
          state.loading = true;
        },
        [tourDelete.fulfilled]: (state, action) => {
          state.loading = false;
          const {arg:{id}} = action.meta
           
          if(id){
            state.userTours= state.userTours.filter((item)=>item._id !==id)
            state.tours= state.tours.filter((item)=>item._id !==id)
          }
        },
        [tourDelete.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        [tourEdit.pending]: (state, action) => {
          state.loading = true;
        },
        [tourEdit.fulfilled]: (state, action) => {
          state.loading = false;
          const {arg:{id}} = action.meta
          // console.log(arg)
          if(id){
            state.userTours= state.userTours.map((item)=>item._id ==id?action.payload:item)
            state.tours= state.tours.map((item)=>item._id==id?action.payload:item)
          }
        },
        [tourEdit.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        [TourSearch.pending]: (state, action) => {
          state.loading = true;
        },
        [TourSearch.fulfilled]: (state, action) => {
          state.loading = false;
          state.searchTours = action.payload;
        },
        [TourSearch.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
       
        [tourLike.pending]: (state, action) => {},
        [tourLike.fulfilled]: (state, action) => {
          state.loading = false;
          const {arg:id} = action.meta
          if(id){
            state.tours= state.tours.map((item)=>item._id==id?action.payload:item)
          }
        },
        [tourLike.rejected]: (state, action) => {
           state.loading = false;
          state.error = action.payload.msg;
        },

        
       
       
      },
   
})


export default TourSlice.reducer 
export const {setCurrentpage} = TourSlice.actions