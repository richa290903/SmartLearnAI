import Footer from "./components/Footer";
import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";


function App() {
  return (
    <div>
      <Header/> 
      <AppRoutes></AppRoutes>
      <Footer/>
    </div>
  )

}

export default App;

