# Vishnu 17 Frontend Repository

## Specs

-   **Database ทั้งพี่และน้อง** มีข้อมูลสำคัญ ๆ หมด

    -   ข้อมูลการแพ้ โรคประจำตัว
    -   ข้อมูลการติดต่อผู้ปกครอง
    -   Restrict ตาม Role ของผู้ใช้
    -   เช็คสถานะการเข้าออกของแต่ละคนได้
    -   พี่บ้าน Tick น้องว่าจะออกตอนไหนได้

-   **ระบบสั่งข้าว** พี่บ้านแต่ละคนสามารถเข้าไป Tick ได้ ว่าจะเอาไม่เอาข้าว ส่วนน้อง ให้ทะเบียนบ้าน Tick คนที่มี Role สวัสดิการสามารถดูยอดได้

-   **ระบบ Lost and Found** แจ้งของหาย Check สถานะได้

-   **Access Control** ต้องมี Permission ถึงมีสิทธิเข้าถึงข้อมูล หรือเปลี่ยนแปลงได้ โดย Permission จะขึ้นอยู่กับ Role

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Extras

-   https://auth0.com/blog/managing-the-state-of-react-apps-with-mobx/
