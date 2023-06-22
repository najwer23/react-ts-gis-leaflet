import StageMap from './stageMap/StageMap'
import { Provider } from "react-redux";
import store from "./store";


function App() {

  return <>
		<Provider store={store}>
			<StageMap />
		</Provider>
	</>
}

export default App;
