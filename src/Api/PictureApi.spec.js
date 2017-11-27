jest.mock("./S3Upload.js");
jest.mock("./dbServer.js");
import PictureApi from './PictureApi';

const PICTURESCHEMA = ["userId", "uuid", "url"].sort();

const TESTFILE = {
  name: "mytest.png",
  type: "png"
}


describe('#create', function () {

  it('should create an object with valid attributes according to the schema', async () => {
    expect.assertions(1)
    let result = await PictureApi.create(TESTFILE, "user123")
    let keys = Object.keys(result).sort();
    expect(keys).toMatchObject(PICTURESCHEMA);
  });
  
});


