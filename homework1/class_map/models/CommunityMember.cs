class CommunityMember
{
    private string? Id { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }


    public CommunityMember(string fullName, string email)
    {
        Id = Guid.NewGuid().ToString();
        FullName = fullName;
        Email = email;
    }

    public virtual string GetRole()
    {
        return "Standard User";
    }

    public override string ToString()
    {
        return $"Nombre: {FullName}, Email: {Email}";
    }
}
