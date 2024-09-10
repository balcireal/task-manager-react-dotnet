using AutoMapper;
using Infrastructure.Utilities;
using Microsoft.AspNetCore.Http;
using System.Data.SqlTypes;
using TaskManagement.Business.CustomExceptions;
using TaskManagement.Business.Interfaces;
using TaskManagement.DataAccess.Interfaces;
using TaskManagement.Model.Dtos.User;
using TaskManagement.Model.Entities;
using BadRequestException = TaskManagement.Business.CustomExceptions.BadRequestException;

namespace TaskManagement.Business.Implementations
{
    public class UserBs : IUserBs
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;

        public UserBs(IUserRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        public async Task<ApiResponse<UserGetDto>> LogIn(string userName, string password, params string[] includeList)
        {
            userName = userName.Trim();
            if (string.IsNullOrEmpty(userName))
            {
                throw new BadRequestException("Kullanıcı Adı Boş Bırakılamaz.");
            }

            if (userName.Length <= 2)
            {
                throw new BadRequestException("Kullanıcı Adı en az 3 karakter olmalıdır.");
            }

            password = password.Trim();
            if (string.IsNullOrEmpty(password))
            {
                throw new BadRequestException("Şifre Boş Bırakılamaz.");
            }

            var user = await _repo.GetByUserNameAndPasswordAsync(userName, password, includeList);

            if (user != null)
            {
                var dto = _mapper.Map<UserGetDto>(user);
                return ApiResponse<UserGetDto>.Success(StatusCodes.Status200OK, dto);
            }
            throw new NotFoundException("Kullanıcı bulunamadı.");
        }

        public async Task<ApiResponse<NoData>> DeleteAsync(int id)
        {
            if (id <= 0)
                throw new BadRequestException("id değeri 0 dan büyük olmalıdır");

            var user = await _repo.GetByIdAsync(id);

            if (user == null)
                throw new NotFoundException("Kullanıcı bulunamadı");

            await _repo.DeleteAsync(user);

            return ApiResponse<NoData>.Success(StatusCodes.Status200OK);
        }

        public async Task<ApiResponse<UserGetDto>> GetByIdAsync(int userId, params string[] includeList)
        {
            if (userId <= 0)
                throw new BadRequestException("id değeri 0 dan büyük olmalıdır");

            var user = await _repo.GetByIdAsync(userId, includeList);
            if (user != null)
            {
                var dto = _mapper.Map<UserGetDto>(user);
                return ApiResponse<UserGetDto>.Success(StatusCodes.Status200OK, dto);
            }

            throw new NotFoundException("Kullanıcı bulunamadı");
        }
        

        public async Task<ApiResponse<List<UserGetDto>>> GetUsersAsync(params string[] includeList)
        {
            var users = await _repo.GetAllAsync(includeList: includeList);
            if (users.Count > 0)
            {
                var returnList = _mapper.Map<List<UserGetDto>>(users);
                var response = ApiResponse<List<UserGetDto>>.Success(StatusCodes.Status200OK, returnList);
                return response;
            }
            throw new NotFoundException("Kullanıcı bulunamadı");
        }

        public async Task<ApiResponse<List<UserGetDto>>> GetUsersByUserNameAsync(string name, params string[] includeList)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new BadRequestException("Kullanıcı adı geçerli olmalıdır");

            var users = await _repo.GetByUserNameAsync(name, includeList);
            if (users != null && users.Count > 0)
            {
                var returnList = _mapper.Map<List<UserGetDto>>(users);
                return ApiResponse<List<UserGetDto>>.Success(StatusCodes.Status200OK, returnList);
            }
            throw new NotFoundException("Kullanıcı bulunamadı");
        }

        public async Task<ApiResponse<List<UserGetDto>>> GetUsersByRoleAsync(string role, params string[] includeList)
        {
            if (string.IsNullOrWhiteSpace(role))
                throw new BadRequestException("Rol geçerli olmalıdır");

            var users = await _repo.GetByRoleAsync(role, includeList);
            if (users != null && users.Count > 0)
            {
                var returnList = _mapper.Map<List<UserGetDto>>(users);
                return ApiResponse<List<UserGetDto>>.Success(StatusCodes.Status200OK, returnList);
            }
            throw new NotFoundException("Kullanıcı bulunamadı");
        }

     
        public async Task<ApiResponse<User>> InsertAsync(UserPostDto dto)
        {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto));

            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                Password = dto.Password,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var insertedUser = await _repo.InsertAsync(user);
            return ApiResponse<User>.Success(StatusCodes.Status201Created, insertedUser);
        }

        public async Task<ApiResponse<NoData>> UpdateAsync(UserPutDto dto)
        {
            if (dto == null)
                throw new BadRequestException("Güncellenecek kullanıcı bilgisi yollamalısınız");

            dto.UpdatedAt = dto.UpdatedAt < SqlDateTime.MinValue.Value ? SqlDateTime.MinValue.Value : dto.UpdatedAt;

            var user = _mapper.Map<User>(dto);

            await _repo.UpdateAsync(user);
            return ApiResponse<NoData>.Success(StatusCodes.Status200OK);
        }

        
    }
}
