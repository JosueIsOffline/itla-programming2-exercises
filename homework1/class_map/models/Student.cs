class Student : CommunityMember
{
    public string Career { get; set; }

    public Student(string fullName, string email, string career) : base(fullName, email)
    {
        Career = career;
    }


    public override string GetRole()
    {
        return "Student";
    }

}
