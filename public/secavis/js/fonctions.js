function ouvrePopup(page,width,height)
{
	try
	{
		win.close();
	}
	catch(err)
	{}
	var left = (screen.width - width) / 2 - 5;
	var top = 10;
	return window.open(page,"win","toolbar=no,location=no,directories=no,status=no,scrollbars=no,resizable=no,copyhistory=no,width="+ width+",height="+ height+",left="+left+",top="+top);
}
