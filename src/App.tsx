
import DropDown from "./Components/DropDown";

function App() {
  const options = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
  const handleOption = (selected) => {
    console.log("Selected Options:", selected);
  };

  return (
    <div className=" h-screen bg-gray-100  border">
      <div className="mx-auto p-10">
        <DropDown
          Label="Single Select"
          options={options}
          handleOption={handleOption}
        />
      </div>
      <div className="mx-auto p-10">
        <DropDown
          Label="Multiple Select"
          options={options}
          handleOption={handleOption}
          multiple={true}
        />
      </div>
    </div>
  );
}

export default App;