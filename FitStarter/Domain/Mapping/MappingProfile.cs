using AutoMapper;
using FitStarter.Domain.Contracts;
using FitStarter.Domain.Entities;


namespace FitStarter.Domain.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateUser, User>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => true));
            CreateMap<UpdateUser, User>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.IsActive, opt => opt.Ignore());
            CreateMap<DeleteUser, User>();
            CreateMap<GetUser, User>();


            // Mapping for Routines
            CreateMap<CreateRoutine, Routine>()
               .ForMember(dest => dest.Id, opt => opt.Ignore())
               .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.UtcNow))
               .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => true));
            CreateMap<UpdateRoutine, Routine>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.IsActive, opt => opt.Ignore());
            CreateMap<DeleteRoutine, Routine>();
            CreateMap<GetRoutine, Routine>();


        }


    }
}
