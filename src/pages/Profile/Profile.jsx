import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { actionGetProfile } from "../../store/authentication/action";
import { toast } from "react-toastify";
import axios from "axios";
import { getUser } from "../../store/authentication/selector";
import baseUpload from "../../api/uploadBase";

const Profile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      let formData = new FormData();
      formData.append("file", file);

      try {
        const { data } = await baseUpload.post(
          "/upload/image?login=true",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("data::", data);
      } catch (error) {
        console.log("err::", error);
      }
    }
  };
  useEffect(() => {
    actionGetProfile()
      .then((data) => {
        setProfile({
          name: data.info.name,
          gender: data.info.gender,
          avatar: data.info.avatar,
          email: data.email,
          birthDay: data.info.birthDay,
        });
      })
      .catch((err) => {
        toast.error(err?.errors?.message, { autoClose: 5000 });
      });
  }, []);

  return (
    <>
      <form class="form-horizontal">
        <fieldset>
          <legend
            style={{
              padding: "10px",
              paddingLeft: "357px",
            }}
          >
            User profile form requirement
          </legend>

          <div class="form-group">
            <label class="col-md-4 control-label" for="Name (Full name)">
              Name (Full name)
            </label>
            <div class="col-md-4">
              <div class="input-group">
                <div class="input-group-addon">
                  <i class="fa fa-user"></i>
                </div>
                <input
                  id="Name (Full name)"
                  name="Name (Full name)"
                  type="text"
                  placeholder="Name (Full name)"
                  class="form-control input-md"
                  onChange={(e) => {
                    setProfile((pre) => {
                      return {
                        ...pre,
                        name: e.target.name,
                      };
                    });
                  }}
                  value={profile?.name}
                />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label" for="Upload photo">
              Upload photo
            </label>
            <div class="col-md-4">
              <input
                id="Upload photo"
                name="Upload photo"
                class="input-file"
                type="file"
                onChange={handleUpload}
              />
            </div>
          </div>

          <div class="form-group">
            <label class="col-md-4 control-label" for="Date Of Birth">
              Date Of Birth
            </label>
            <div class="col-md-4">
              <div class="input-group">
                <div class="input-group-addon">
                  <i class="fa fa-birthday-cake"></i>
                </div>
                <input
                  id="Date Of Birth"
                  name="Date Of Birth"
                  type="text"
                  placeholder="Date Of Birth"
                  class="form-control input-md"
                  value={profile?.birthDay}
                  onChange={(e) => {
                    console.log("birthday::", e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label" for="Gender">
              Gender
            </label>
            <div class="col-md-4">
              <label class="radio-inline" for="Gender-0">
                <input
                  type="radio"
                  name="Gender"
                  id="Gender-0"
                  value="male"
                  checked={profile?.gender === "male" ? "checked" : ""}
                  onChange={(e) => {
                    setProfile((pre) => {
                      return {
                        ...pre,
                        gender: e.target.value,
                      };
                    });
                  }}
                />
                Male
              </label>
              <label class="radio-inline" for="Gender-1">
                <input
                  onChange={(e) => {
                    setProfile((pre) => {
                      return {
                        ...pre,
                        gender: e.target.value,
                      };
                    });
                  }}
                  type="radio"
                  name="Gender"
                  id="Gender-1"
                  value="female"
                  checked={profile?.gender === "female" ? "checked" : ""}
                />
                Female
              </label>
              <label class="radio-inline" for="Gender-2">
                <input
                  onChange={(e) => {
                    setProfile((pre) => {
                      return {
                        ...pre,
                        gender: e.target.value,
                      };
                    });
                  }}
                  type="radio"
                  name="Gender"
                  id="Gender-2"
                  value="other"
                  checked={profile?.gender === "other" ? "checked" : ""}
                />
                Other
              </label>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label" for="Email Address">
              Email Address
            </label>
            <div class="col-md-4">
              <div class="input-group">
                <div class="input-group-addon">
                  <i class="fa fa-envelope-o"></i>
                </div>
                <input
                  id="Email Address"
                  name="Email Address"
                  type="text"
                  placeholder="Email Address"
                  class="form-control input-md"
                  value={profile?.email}
                  disabled={true}
                />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label"></label>
            <div class="col-md-4">
              <a href="javascript:void(0);" class="btn btn-success">
                <span class="glyphicon glyphicon-thumbs-up"></span> Submit
              </a>
              <a href="javascript:void(0);" class="btn btn-danger" value="">
                <span class="glyphicon glyphicon-remove-sign"></span> Clear
              </a>
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default Profile;
