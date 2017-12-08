function loadDoc()
{
	document.getElementById("reset").addEventListener("click", resetForm());
}

function validateForm()
{
	if(document.form.name.value == "")
	{
		alert("Please provide a name.");
		document.form.name.focus();
		return false;
	}

	if(document.form.email.value == "")
	{
		alert("Please provide an email.");
		document.form.email.focus();
		return false;
	}

	if(document.form.reason.value == "suggestion")
	{
		alert("Impossible! No better team exists.");
		return false;
	}
}

document.addEventListener("DOMContentLoaded", loadDoc, false)