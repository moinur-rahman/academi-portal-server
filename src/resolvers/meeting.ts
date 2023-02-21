import { Resolver, Query } from "type-graphql";
import { Meeting } from "../entities";
import axios from "axios";

@Resolver()
class MeetingResolver {
  @Query(() => Meeting)
  async getMeetingUrl(): Promise<any> {
    const data = {
      topic: "test post2",
      type: 2,
      start_time: "2023-02-21T12:10:10Z",
      duration: "30",
      password: "123456",
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: true,
        mute_upon_entry: "true",
        watermark: "true",
        audio: "voip",
        auto_recording: "cloud",
      },
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInYiOiIyLjAiLCJraWQiOiI5ZGFmMzNjZS04NmU4LTQwMzUtOWJiNS1lZDY5ODUxNWMzZmEifQ.eyJ2ZXIiOjgsImF1aWQiOiI0MzdiYjUzM2NmMTM1OTYyMTk2YjVjZDdlYzg5NTYyOCIsImNvZGUiOiIyVlhMbklRb1NYVGxRTFFiSmxrVG1PRVdsNUVqT1JHN3ciLCJpc3MiOiJ6bTpjaWQ6Z21sdmI1S09SaU9obllHNW1qcU1nIiwiZ25vIjowLCJ0eXBlIjowLCJ0aWQiOjAsImF1ZCI6Imh0dHBzOi8vb2F1dGguem9vbS51cyIsInVpZCI6InpSVUNoaERzUmVpTWZEZVlselZVYUEiLCJuYmYiOjE2NzY4ODIwNzYsImV4cCI6MTY3Njg4NTY3NiwiaWF0IjoxNjc2ODgyMDc2LCJhaWQiOiJzbUdYRlBSSFRBYWxsTTdjMEdtdmhBIiwianRpIjoiYmFmNjEwMjgtYWNhZi00NDRiLWFiYjYtNWU2ZTQ5ZjU0NGVlIn0.UkcBn0p1psJ4l8pEdyVwCrXUUNxMqP-mBietOp_Af7xypu2vHS7gcTgzlFkfodtRY7pN-zqdyPK7veLg350-4Q`,
        },
      };

      const response = await axios.post(
        "https://api.zoom.us/v2/users/me/meetings",
        data,
        config
      );

      const meeting = new Meeting();

      meeting.meetingUrl = response.data.join_url;

      await meeting.save();

      console.log(response.data.join_url);
      return meeting;
    } catch (error) {
      console.log(error);
    }
  }
}

export default MeetingResolver;
