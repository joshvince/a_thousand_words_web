jest.mock("./dbServer.js");
jest.mock("./S3Upload.js");
import StoryApi from './StoryApi';

const STORYSCHEMA = [ "userId", "uuid", "title", "subtitle", "steps",].sort();

const FORMDATA = {
  header: {
    title: "my cool title",
    subtitle: "my cool subtitle"
  },
  steps: [
    {
      stepKey: 0,
      data: {
        headline: "my headline",
        description: "a good description",
        imageFile: {
          name: "mypic.jpg",
          type: "jpg"
        },
        imageFileName: "mypic.jpg"
      },
      section: "step"
    },
    {
      stepKey: 1,
      data: {
        headline: "Second headline",
        description: "a good description",
        imageFile: {
          name: "coolpic.png",
          type: "png"
        },
        "showModal": false
      }
    }
  ]
}

describe('#uploadStory', function () {

  it('should create an object representing the correct story schema', async () => {
    expect.assertions(1)
    const story = await StoryApi.create(FORMDATA, "123ID")
    const keys = Object.keys(story.object).sort()

    expect(keys).toMatchObject(STORYSCHEMA)
  });
  
});






