function kakunin(btnNo)
{
if (btnNo == 2) {
	link = "Google";
	ret = confirm(link + "に移動します");
	href = "http://www.google.co.jp/";

	} else
	{
	link = "Yahoo!Japan";
	location.href = "http://www.yahoo.co.jp/";
	}
	if (ret == true)
	{
	location.href = href;
	}
}
