import { Todolist } from "./modules/Todolist";
import "./styles.css";

export default function App() {
    return (
        <div className="App box-shadow">
            <Todolist title="Todos App" />
        </div>
    );
}
