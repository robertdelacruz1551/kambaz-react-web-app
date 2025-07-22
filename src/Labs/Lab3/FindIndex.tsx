/* eslint-disable prefer-const */
export default function FindIndex() {
  let numberArray1 = [1, 2, 3, 4, 5];
  let stringArray1 = ["string1", "string2", "string3"];

  const fourIndex = numberArray1.findIndex(a => a === 4);
  const string3Index = stringArray1.findIndex(a => a === 'string3');
  
  return (
    <div id="wd-find-function">
      <h4>Find Function</h4>
      four = {numberArray1.at(fourIndex)} <br />
      string3 = {stringArray1.at(string3Index)} <hr />
    </div>
  );
}