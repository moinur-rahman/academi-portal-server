import { Resolver, Query } from "type-graphql";
import { Meeting, } from "../entities";
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
          Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInYiOiIyLjAiLCJraWQiOiI1M2U2NjE0OS00MGQxLTRmNmUtOWYwZC0zMmZmNmUyMDAyMzMifQ.eyJ2ZXIiOjgsImF1aWQiOiI0MzdiYjUzM2NmMTM1OTYyMTk2YjVjZDdlYzg5NTYyOCIsImNvZGUiOiJzQUZqUnQxYUpJVEh4TEdUT2ZzUmoydVZXTzA3a0N2YVEiLCJpc3MiOiJ6bTpjaWQ6Z21sdmI1S09SaU9obllHNW1qcU1nIiwiZ25vIjowLCJ0eXBlIjowLCJ0aWQiOjAsImF1ZCI6Imh0dHBzOi8vb2F1dGguem9vbS51cyIsInVpZCI6InpSVUNoaERzUmVpTWZEZVlselZVYUEiLCJuYmYiOjE2NzY4NzgzMTUsImV4cCI6MTY3Njg4MTkxNSwiaWF0IjoxNjc2ODc4MzE1LCJhaWQiOiJzbUdYRlBSSFRBYWxsTTdjMEdtdmhBIiwianRpIjoiYjg1ODlhNGQtNTdhOC00MTBlLTg3NmQtNDYzMjgyMzBlNTc3In0.GEyPsCKT4iVSuGx2odFAT0WUgQOh3x00W0qcFfBsC5ibxGf9QbdtTZF9ZMI0vf9kLX4llXyD20Z1XkvqzGZiww`,
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
