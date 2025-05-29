class FormerStudent : CommunityMember
{
    public int GraduationYear { get; set; }

    public FormerStudent(string fullName, string email, int graduationYear) : base(fullName, email)
    {
        GraduationYear = graduationYear;
    }

    public override string GetRole()
    {
        return "Former Student";
    }
}
