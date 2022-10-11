import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { userLogin,userRegister } from "../Api/Api";

export const login = createAsyncThunk(
    "auth/login",
    async ({ input, navigate, toast }, { rejectWithValue }) => {
      try {
        const response = await userLogin( input);
        toast.success("Login Successfully");
        navigate("/");
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


  export const register = createAsyncThunk(
    "auth/register",
    async ({ formValue, navigate, toast }, { rejectWithValue }) => {
      try {
        const response = await userRegister(formValue);
        toast.success("Register Successfully");
        navigate("/");
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
const Userslice= createSlice({
    name:'user',
    initialState:{
        
        error:'',
        loading:false,
        user:null


    },
    reducers:{
        setUser: (state, action) => {
            state.user = action.payload;
          },
          setLogout: (state, action) => {
            localStorage.clear();
            state.user = null;
          },

    },
    extraReducers: {
        [login.pending]: (state, action) => {
          state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
          state.loading = false;
          localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
          state.user = action.payload;
        },
        [login.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
        [register.pending]: (state, action) => {
          state.loading = true;
        },
        [register.fulfilled]: (state, action) => {
          state.loading = false;
          localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
          state.user = action.payload;
        },
        [register.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.msg;
        },
       
      },
   
})


export default Userslice.reducer 
export const  {setUser, setLogout} = Userslice.actions