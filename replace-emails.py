def replace_email(email):
    if email == b"fred@gmail.com":
        return b"fredayemtsa@gmail.com"
    return email

def replace_emails_callback(commit):
    commit.author_email = replace_email(commit.author_email)
    commit.committer_email = replace_email(commit.committer_email)

from git_filter_repo import FilterRepo

repo = FilterRepo(callback=replace_emails_callback)
repo.run()
