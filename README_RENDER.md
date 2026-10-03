# Hướng dẫn Deploy n8n lên Render (Mô hình Single Instance)

Tệp tin cấu hình đã được tạo để bạn triển khai n8n lên Render một cách nhanh chóng.

## Cách 1: Triển khai tự động bằng Render Blueprint (Khuyên dùng - 1 Click)

1. Đưa toàn bộ code dự án này lên repository của bạn trên **GitHub** hoặc **GitLab**.
2. Đăng nhập vào [Render Dashboard](https://dashboard.render.com/).
3. Nhấp vào nút **New +** ở góc trên phải và chọn **Blueprint**.
4. Kết nối repository GitHub/GitLab của bạn.
5. Render sẽ tự động đọc file `render.yaml` và phát hiện:
   - **Database**: PostgreSQL `n8n-db`
   - **Web Service**: `n8n-service`
6. Tại phần cấu hình biến môi trường, nhập giá trị cho `WEBHOOK_URL`:
   - URL có dạng: `https://<ten-app-cua-ban>.onrender.com/`
7. Nhấp **Apply** để Render bắt đầu khởi tạo Database và build Web Service.

---

## Cách 2: Triển khai thủ công (Manual Setup)

Nếu bạn không muốn dùng Blueprint:

### Bước 1: Tạo Database PostgreSQL
1. Nhấp **New +** $\rightarrow$ **PostgreSQL**.
2. Đặt tên: `n8n-db`, chọn Region gần bạn.
3. Tạo xong, lưu lại thông tin kết nối (Host, Database Name, User, Password).

### Bước 2: Tạo Web Service cho n8n
1. Nhấp **New +** $\rightarrow$ **Web Service**.
2. Chọn **Existing Image** và điền:
   `docker.n8n.io/n8nio/n8n:latest`
3. Trong phần **Environment Variables**, thêm các biến sau:
   - `DB_TYPE` = `postgresdb`
   - `DB_POSTGRESDB_HOST` = `<Host của Render Postgres>`
   - `DB_POSTGRESDB_PORT` = `5432`
   - `DB_POSTGRESDB_DATABASE` = `<Tên Database>`
   - `DB_POSTGRESDB_USER` = `<Tên User>`
   - `DB_POSTGRESDB_PASSWORD` = `<Mật khẩu Database>`
   - `DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED` = `false`
   - `N8N_ENCRYPTION_KEY` = `<Chuỗi bí mật 32 ký tự tự chọn>`
   - `N8N_PORT` = `10000`
   - `WEBHOOK_URL` = `https://<ten-app-cua-ban>.onrender.com/`
4. Nhấp **Create Web Service**.
