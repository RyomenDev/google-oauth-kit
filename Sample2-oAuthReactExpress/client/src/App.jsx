

import googleButton from './assets/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png'
import './App.css'

function navigate(url){
  window.location.href = url;
}

async function auth(){
  const response =await fetch(`${import.meta.env.VITE_API_URL}/request`,{method:'post'});

  const data = await response.json();
  console.log(data);
  navigate(data.url);

}


function App() {


  return (
    <>
<h1>Welcome!</h1>
<h3>Google OAuth!</h3>

<button className="btn-auth"  type="button" onClick={()=> auth()}>
            <img className="btn-auth-img" src={googleButton} alt='google sign in'/>
            </button>
    </>
  )
}

export default App
