# Vishnu 17 Frontend

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
