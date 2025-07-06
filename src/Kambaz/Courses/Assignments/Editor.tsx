export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option value="COMEDY">Comedy</option>
            </select>
          </td>
        </tr>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option value="COMEDY">Comedy</option>
            </select>
          </td>
        </tr>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option value="COMEDY">Comedy</option>
            </select>
          </td>
        </tr>

        <tr>
          <td align="right" valign="top"></td>
          <td>
            <label>Online Entry Option</label><br />
            <input type="checkbox" name="check-genre" id="wd-text-entry"/>
            <label htmlFor="wd-text-entry">Text Entry</label><br/>
            <input type="checkbox" name="check-genre" id="wd-website-url"/>
            <label htmlFor="wd-website-url">Website URL</label><br/>
            <input type="checkbox" name="check-genre" id="wd-media-recordings"/>
            <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
            <input type="checkbox" name="check-genre" id="wd-student-annotation"/>
            <label htmlFor="wd-student-annotation">Student Annotation</label><br/>
            <input type="checkbox" name="check-genre" id="wd-file-upload"/>
            <label htmlFor="wd-file-upload">File Upload</label><br/>
          </td>
        </tr>
        
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Submission Type</label>
          </td>
          <td>
            <input placeholder="jdoe" id="wd-assign-to" /> <br />
          </td>
        </tr>

        <tr>
          <td align="right" valign="top"></td>
          <td>
            <label htmlFor="wd-due-date">Due</label>
            <input type="date"
                value="2000-01-21"
                id="wd-due-date"/><br/>
          </td>
        </tr>

        <tr>
          <td align="right" valign="top"></td>
          <td>
            <div>
              <label htmlFor="wd-available-from">Available From</label>
              <input type="date"
                  value="2000-01-21"
                  id="wd-available-from"/><br/>
            </div>
            <div>
              <label htmlFor="wd-available-until">Until</label>
              <input type="date"
                  value="2000-01-21"
                  id="wd-available-until"/><br/>
            </div>
          </td>
        </tr>

        <tr>
          <td align="right" valign="top"></td>
          <td>
            <button type='button'>Cancel</button>
            <button type='button'>Save</button>
          </td>
        </tr>
        
      </table>
    </div>

  );
}
