/////////////////////////////////////////////////////////////////////////////
// Function : NavNode (constructor)
// Comments :
/////////////////////////////////////////////////////////////////////////////
function NavNode(id, label, href, parent)
{
	this.m_parent = null;
	this.m_level = 0;

	if (parent)
	{
		this.m_parent = parent;
		this.m_level = parent.m_level+1;
	}

	this.m_id = id;

	// assume that m_label will most often be used directly as HTML
	this.m_rawlabel = label;

	label = label.replace(/&/g, '&amp;');
	label = label.replace(/</g, '&lt;');
	label = label.replace(/>/g, '&gt;');
	label = label.replace(/"/g, '&quot;');

	this.m_label = label;

	this.m_href = href;
	this.m_subNodes = new Array();

	var argValues = NavNode.arguments;
	var argCount = NavNode.arguments.length;

	for (i = 4 ; i < argCount ; i++)
	{
		var eqPos = argValues[i].indexOf("==");
		var attrName = argValues[i].substring(0,eqPos);
		var attrValue = argValues[i].substring(eqPos+2);

		eval("this.cp_" + attrName + " = '" + attrValue + "';");
	}

	NavNode.prototype.addNode = addNode;
	NavNode.prototype.isSelected = isSelected;
}

/////////////////////////////////////////////////////////////////////////////
// Function : addNode
// Comments :
/////////////////////////////////////////////////////////////////////////////
function addNode(id, label, href)
{
	var newIndex = this.m_subNodes.length;
	var newNode = new NavNode(id, label, href, this);

	var argValues = addNode.arguments;
	var argCount = addNode.arguments.length;

	for (i = 3 ; i < argCount ; i++)
	{
		var eqPos = argValues[i].indexOf("==");
		var attrName = argValues[i].substring(0,eqPos);
		var attrValue = argValues[i].substring(eqPos+2);

		eval("newNode.cp_" + attrName + " = '" + attrValue + "';");
	}

	this.m_subNodes[newIndex] = newNode;
	return newNode;
}

/////////////////////////////////////////////////////////////////////////////
// Function : isSelected
// Comments :
/////////////////////////////////////////////////////////////////////////////
function isSelected()
{
    var pos = window.location.href.lastIndexOf("/");
    var docname = window.location.href.substring(pos+1, window.location.href.length);

    pos = this.m_href.lastIndexOf("/");
    var myname = this.m_href.substring(pos+1, this.m_href.length);

    if (docname == myname)
		return true;
	else
		return false;
}

/////////////////////////////////////////////////////////////////////////////
// Function : customSectionPropertyExists
// Comments :
/////////////////////////////////////////////////////////////////////////////
function customSectionPropertyExists(csp)
{
	return (typeof csp != _U && csp != null);
}

/////////////////////////////////////////////////////////////////////////////
// Function : getCustomSectionProperty
// Comments :
/////////////////////////////////////////////////////////////////////////////
function getCustomSectionProperty(csp)
{
	if (customSectionPropertyExists(csp))
	{
		return csp;
	}
	else
	{
		return "";
	}
}

/////////////////////////////////////////////////////////////////////////////

var g_navNode_Root = new NavNode('1000','\u9996\u9875',ssUrlPrefix + 'index.htm',null);
g_navNode_0=g_navNode_Root.addNode('2613','\u624b\u673a',ssUrlPrefix + 'mobile-phones/index.htm','externalUrl==mobile-phones/all-phones/index.htm');
g_navNode_0_0=g_navNode_0.addNode('1670','\u529f\u80fd\u7279\u5f81',ssUrlPrefix + 'mobile-phones/features/index.htm','secondaryUrlVariableField==article');
g_navNode_0_1=g_navNode_0.addNode('1671','\u4ea7\u54c1\u5c55\u793a',ssUrlPrefix + 'mobile-phones/gallery/index.htm','secondaryUrlVariableField==article');
g_navNode_0_2=g_navNode_0.addNode('1678','\u89c4\u683c\u53c2\u6570',ssUrlPrefix + 'mobile-phones/tech-specs/index.htm','secondaryUrlVariableField==article');
g_navNode_0_3=g_navNode_0.addNode('1681','\u6280\u672f\u652f\u6301',ssUrlPrefix + 'mobile-phones/support/index.htm','externalUrl==http\x3a//10.88.48.176/endevice/mobile-phones/smart-phones/support/manuals/index.htm');
g_navNode_0_4=g_navNode_0.addNode('10223','\u624b\u673a\u5bf9\u6bd4',ssUrlPrefix + 'mobile-phones/compare/index.htm');
g_navNode_1=g_navNode_Root.addNode('2617','\u5e73\u677f\u7535\u8111',ssUrlPrefix + 'tablets/index.htm');
g_navNode_1_0=g_navNode_1.addNode('2619','\u529f\u80fd\u7279\u5f81',ssUrlPrefix + 'tablets/features/index.htm','secondaryUrlVariableField==article');
g_navNode_1_1=g_navNode_1.addNode('2620','\u4ea7\u54c1\u5c55\u793a',ssUrlPrefix + 'tablets/gallery/index.htm','secondaryUrlVariableField==article');
g_navNode_1_2=g_navNode_1.addNode('1748','\u89c4\u683c\u53c2\u6570',ssUrlPrefix + 'tablets/tech-specs/index.htm','secondaryUrlVariableField==article');
g_navNode_1_3=g_navNode_1.addNode('1773','\u6280\u672f\u652f\u6301',ssUrlPrefix + 'tablets/support/index.htm');
g_navNode_1_4=g_navNode_1.addNode('1775','\u5e73\u677f\u7535\u8111\u5bf9\u6bd4',ssUrlPrefix + 'tablets/compare/index.htm');
g_navNode_2=g_navNode_Root.addNode('2622','\u79fb\u52a8\u5bbd\u5e26',ssUrlPrefix + 'mobile-broadband/index.htm','externalUrl==\x3c\x21--\x24ssServerRelativeSiteRoot--\x3eportable-internet/mobile-wifi/index.htm');
g_navNode_2_0=g_navNode_2.addNode('2623','Mobile WiFi',ssUrlPrefix + 'mobile-broadband/mobile-wifi/index.htm');
g_navNode_2_0_0=g_navNode_2_0.addNode('1807','\u529f\u80fd\u7279\u5f81',ssUrlPrefix + 'mobile-broadband/mobile-wifi/features/index.htm','secondaryUrlVariableField==article');
g_navNode_2_0_1=g_navNode_2_0.addNode('1811','\u89c4\u683c\u53c2\u6570',ssUrlPrefix + 'mobile-broadband/mobile-wifi/tech-specs/index.htm','secondaryUrlVariableField==article');
g_navNode_2_0_2=g_navNode_2_0.addNode('1816','\u6280\u672f\u652f\u6301',ssUrlPrefix + 'mobile-broadband/mobile-wifi/support/index.htm');
g_navNode_2_0_2_0=g_navNode_2_0_2.addNode('1818','\u4ea7\u54c1\u624b\u518c',ssUrlPrefix + 'mobile-broadband/mobile-wifi/support/manuals/index.htm','secondaryUrlVariableField==article');
g_navNode_2_0_2_0_0=g_navNode_2_0_2_0.addNode('1819','\u8be6\u7ec6\u4fe1\u606f',ssUrlPrefix + 'mobile-broadband/mobile-wifi/support/manuals/detail/index.htm','secondaryUrlVariableField==article');
g_navNode_2_0_2_1=g_navNode_2_0_2.addNode('1820','\u8f6f\u4ef6\u4e0b\u8f7d',ssUrlPrefix + 'mobile-broadband/mobile-wifi/support/downloads/index.htm','secondaryUrlVariableField==article');
g_navNode_2_0_2_1_0=g_navNode_2_0_2_1.addNode('1821','\u8be6\u7ec6\u4fe1\u606f',ssUrlPrefix + 'mobile-broadband/mobile-wifi/support/downloads/detail/index.htm','secondaryUrlVariableField==article');
g_navNode_2_0_2_2=g_navNode_2_0_2.addNode('1822','\u5e38\u89c1\u95ee\u9898',ssUrlPrefix + 'mobile-broadband/mobile-wifi/support/faqs/index.htm','secondaryUrlVariableField==article');
g_navNode_2_0_3=g_navNode_2_0.addNode('15304','\u4ea7\u54c1\u5c55\u793a',ssUrlPrefix + 'mobile-broadband/mobile-wifi/gallery/index.htm','secondaryUrlVariableField==article');
g_navNode_2_1=g_navNode_2.addNode('2624','\u6570\u636e\u5361',ssUrlPrefix + 'mobile-broadband/dongles/index.htm');
g_navNode_2_1_0=g_navNode_2_1.addNode('1824','\u529f\u80fd\u7279\u5f81',ssUrlPrefix + 'mobile-broadband/dongles/features/index.htm','secondaryUrlVariableField==article');
g_navNode_2_1_1=g_navNode_2_1.addNode('1838','\u89c4\u683c\u53c2\u6570',ssUrlPrefix + 'mobile-broadband/dongles/tech-specs/index.htm','secondaryUrlVariableField==article');
g_navNode_2_1_2=g_navNode_2_1.addNode('1841','\u6280\u672f\u652f\u6301',ssUrlPrefix + 'mobile-broadband/dongles/support/index.htm');
g_navNode_2_1_2_0=g_navNode_2_1_2.addNode('1844','\u4ea7\u54c1\u624b\u518c',ssUrlPrefix + 'mobile-broadband/dongles/support/manuals/index.htm','secondaryUrlVariableField==article');
g_navNode_2_1_2_0_0=g_navNode_2_1_2_0.addNode('1845','\u8be6\u7ec6\u4fe1\u606f',ssUrlPrefix + 'mobile-broadband/dongles/support/manuals/detail/index.htm','secondaryUrlVariableField==article');
g_navNode_2_1_2_1=g_navNode_2_1_2.addNode('1846','\u8f6f\u4ef6\u4e0b\u8f7d',ssUrlPrefix + 'mobile-broadband/dongles/support/downloads/index.htm','secondaryUrlVariableField==article');
g_navNode_2_1_2_1_0=g_navNode_2_1_2_1.addNode('1847','\u8be6\u7ec6\u4fe1\u606f',ssUrlPrefix + 'mobile-broadband/dongles/support/downloads/detail/index.htm','secondaryUrlVariableField==article');
g_navNode_2_1_2_2=g_navNode_2_1_2.addNode('1848','\u5e38\u89c1\u95ee\u9898',ssUrlPrefix + 'mobile-broadband/dongles/support/faqs/index.htm','secondaryUrlVariableField==article');
g_navNode_2_1_3=g_navNode_2_1.addNode('15305','\u4ea7\u54c1\u5c55\u793a',ssUrlPrefix + 'mobile-broadband/dongles/gallery/index.htm','secondaryUrlVariableField==article');
g_navNode_2_2=g_navNode_2.addNode('2625','WiFi\u732b',ssUrlPrefix + 'mobile-broadband/wingles/index.htm');
g_navNode_2_2_0=g_navNode_2_2.addNode('1912','\u529f\u80fd\u7279\u5f81',ssUrlPrefix + 'mobile-broadband/wingles/features/index.htm','secondaryUrlVariableField==article');
g_navNode_2_2_1=g_navNode_2_2.addNode('1914','\u89c4\u683c\u53c2\u6570',ssUrlPrefix + 'mobile-broadband/wingles/tech-specs/index.htm','secondaryUrlVariableField==article');
g_navNode_2_2_2=g_navNode_2_2.addNode('1925','\u6280\u672f\u652f\u6301',ssUrlPrefix + 'mobile-broadband/wingles/support/index.htm');
g_navNode_2_2_2_0=g_navNode_2_2_2.addNode('1926','\u4ea7\u54c1\u624b\u518c',ssUrlPrefix + 'mobile-broadband/wingles/support/manuals/index.htm','secondaryUrlVariableField==article');
g_navNode_2_2_2_0_0=g_navNode_2_2_2_0.addNode('1930','\u8be6\u7ec6\u4fe1\u606f',ssUrlPrefix + 'mobile-broadband/wingles/support/manuals/detail/index.htm','secondaryUrlVariableField==article');
g_navNode_2_2_2_1=g_navNode_2_2_2.addNode('1927','\u8f6f\u4ef6\u4e0b\u8f7d',ssUrlPrefix + 'mobile-broadband/wingles/support/downloads/index.htm','secondaryUrlVariableField==article');
g_navNode_2_2_2_1_0=g_navNode_2_2_2_1.addNode('1932','\u8be6\u7ec6\u4fe1\u606f',ssUrlPrefix + 'mobile-broadband/wingles/support/downloads/detail/index.htm','secondaryUrlVariableField==article');
g_navNode_2_2_2_2=g_navNode_2_2_2.addNode('1928','\u5e38\u89c1\u95ee\u9898',ssUrlPrefix + 'mobile-broadband/wingles/support/faqs/index.htm','secondaryUrlVariableField==article');
g_navNode_2_2_3=g_navNode_2_2.addNode('15306','\u4ea7\u54c1\u5c55\u793a',ssUrlPrefix + 'mobile-broadband/wingles/gallery/index.htm','secondaryUrlVariableField==article');
g_navNode_3=g_navNode_Root.addNode('16195','\u667a\u80fd\u7a7f\u6234',ssUrlPrefix + 'wearables/index.htm');
g_navNode_3_0=g_navNode_3.addNode('15363','\u529f\u80fd\u7279\u5f81',ssUrlPrefix + 'wearables/features/index.htm','secondaryUrlVariableField==article');
g_navNode_3_1=g_navNode_3.addNode('15364','\u4ea7\u54c1\u5c55\u793a',ssUrlPrefix + 'wearables/gallery/index.htm','secondaryUrlVariableField==article');
g_navNode_3_2=g_navNode_3.addNode('13268','\u89c4\u683c\u53c2\u6570',ssUrlPrefix + 'wearables/tech-specs/index.htm','secondaryUrlVariableField==article');
g_navNode_3_3=g_navNode_3.addNode('13306','\u6280\u672f\u652f\u6301',ssUrlPrefix + 'wearables/support/index.htm');
g_navNode_3_3_0=g_navNode_3_3.addNode('13307','\u4ea7\u54c1\u624b\u518c',ssUrlPrefix + 'wearables/support/manuals/index.htm','secondaryUrlVariableField==article');
g_navNode_3_3_1=g_navNode_3_3.addNode('13308','\u8f6f\u4ef6\u4e0b\u8f7d',ssUrlPrefix + 'wearables/support/downloads/index.htm','secondaryUrlVariableField==article');
g_navNode_3_3_2=g_navNode_3_3.addNode('13345','\u5e38\u89c1\u95ee\u9898',ssUrlPrefix + 'wearables/support/faqs/index.htm','secondaryUrlVariableField==article');
g_navNode_3_3_3=g_navNode_3_3.addNode('13346','\u4ea7\u54c1\u6a21\u62df\u5668',ssUrlPrefix + 'wearables/support/simulator/index.htm','secondaryUrlVariableField==article');
g_navNode_4=g_navNode_Root.addNode('5712','\u914d\u4ef6',ssUrlPrefix + 'accessories/index.htm','externalUrl==\x3c\x21--\x24ssServerRelativeSiteRoot--\x3eaccessories/for-mobile-phones/index.htm','secondaryUrlVariableField==detail');
g_navNode_4_0=g_navNode_4.addNode('16198','\u529f\u80fd\u7279\u5f81',ssUrlPrefix + 'accessories/features/index.htm','secondaryUrlVariableField==article');
g_navNode_4_1=g_navNode_4.addNode('16199','\u4ea7\u54c1\u5c55\u793a',ssUrlPrefix + 'accessories/gallery/index.htm','secondaryUrlVariableField==article');
g_navNode_5=g_navNode_Root.addNode('16481','\u667a\u80fd\u5bb6\u5c45',ssUrlPrefix + 'smart-home/index.htm');
g_navNode_5_0=g_navNode_5.addNode('16500','\u65e0\u7ebf\u8def\u7531\u5668',ssUrlPrefix + 'smart-home/wireless-routers/index.htm');
g_navNode_5_0_0=g_navNode_5_0.addNode('16501','\u529f\u80fd\u7279\u5f81',ssUrlPrefix + 'smart-home/wireless-routers/features/index.htm','secondaryUrlVariableField==article');
g_navNode_5_0_1=g_navNode_5_0.addNode('16502','\u4ea7\u54c1\u5c55\u793a',ssUrlPrefix + 'smart-home/wireless-routers/gallery/index.htm','secondaryUrlVariableField==article');
g_navNode_5_0_2=g_navNode_5_0.addNode('16503','\u89c4\u683c\u53c2\u6570',ssUrlPrefix + 'smart-home/wireless-routers/tech-specs/index.htm','secondaryUrlVariableField==article');
g_navNode_5_0_3=g_navNode_5_0.addNode('16504','\u6280\u672f\u652f\u6301',ssUrlPrefix + 'smart-home/wireless-routers/support/index.htm');
g_navNode_5_0_3_0=g_navNode_5_0_3.addNode('16505','\u4ea7\u54c1\u624b\u518c',ssUrlPrefix + 'smart-home/wireless-routers/support/manuals/index.htm','secondaryUrlVariableField==article');
g_navNode_5_0_3_0_0=g_navNode_5_0_3_0.addNode('16506','\u8be6\u7ec6\u4fe1\u606f',ssUrlPrefix + 'smart-home/wireless-routers/support/manuals/detail/index.htm','secondaryUrlVariableField==article');
g_navNode_5_0_3_1=g_navNode_5_0_3.addNode('16507','\u8f6f\u4ef6\u4e0b\u8f7d',ssUrlPrefix + 'smart-home/wireless-routers/support/downloads/index.htm','secondaryUrlVariableField==article');
g_navNode_5_0_3_1_0=g_navNode_5_0_3_1.addNode('16508','\u8be6\u7ec6\u4fe1\u606f',ssUrlPrefix + 'smart-home/wireless-routers/support/downloads/Detail/index.htm','secondaryUrlVariableField==article');
g_navNode_5_0_3_2=g_navNode_5_0_3.addNode('16509','\u5e38\u89c1\u95ee\u9898',ssUrlPrefix + 'smart-home/wireless-routers/support/faqs/index.htm','secondaryUrlVariableField==article');
g_navNode_5_1=g_navNode_5.addNode('16512','DSL\u7ec8\u7aef',ssUrlPrefix + 'smart-home/broadband-modem/index.htm');
g_navNode_5_1_0=g_navNode_5_1.addNode('16513','\u529f\u80fd\u7279\u5f81',ssUrlPrefix + 'smart-home/broadband-modem/features/index.htm','secondaryUrlVariableField==article');
g_navNode_5_1_1=g_navNode_5_1.addNode('16514','\u4ea7\u54c1\u5c55\u793a',ssUrlPrefix + 'smart-home/broadband-modem/gallery/index.htm','secondaryUrlVariableField==article');
g_navNode_5_1_2=g_navNode_5_1.addNode('16515','\u89c4\u683c\u53c2\u6570',ssUrlPrefix + 'smart-home/broadband-modem/tech-specs/index.htm','secondaryUrlVariableField==article');
g_navNode_5_1_3=g_navNode_5_1.addNode('16516','\u6280\u672f\u652f\u6301',ssUrlPrefix + 'smart-home/broadband-modem/support/index.htm');
g_navNode_5_1_3_0=g_navNode_5_1_3.addNode('16517','\u4ea7\u54c1\u624b\u518c',ssUrlPrefix + 'smart-home/broadband-modem/support/manuals/index.htm','secondaryUrlVariableField==article');
g_navNode_5_1_3_0_0=g_navNode_5_1_3_0.addNode('16518','\u8be6\u7ec6\u4fe1\u606f',ssUrlPrefix + 'smart-home/broadband-modem/support/manuals/detail/index.htm','secondaryUrlVariableField==article');
g_navNode_5_1_3_1=g_navNode_5_1_3.addNode('16519','\u8f6f\u4ef6\u4e0b\u8f7d',ssUrlPrefix + 'smart-home/broadband-modem/support/downloads/index.htm','secondaryUrlVariableField==article');
g_navNode_5_1_3_1_0=g_navNode_5_1_3_1.addNode('16520','\u8be6\u7ec6\u4fe1\u606f',ssUrlPrefix + 'smart-home/broadband-modem/support/downloads/detail/index.htm','secondaryUrlVariableField==article');
g_navNode_5_1_3_2=g_navNode_5_1_3.addNode('16521','\u5e38\u89c1\u95ee\u9898',ssUrlPrefix + 'smart-home/broadband-modem/support/faqs/index.htm','secondaryUrlVariableField==article');
g_navNode_5_2=g_navNode_5.addNode('16524','\u7535\u529b\u732b',ssUrlPrefix + 'smart-home/plc/index.htm');
g_navNode_5_2_0=g_navNode_5_2.addNode('16525','\u529f\u80fd\u7279\u5f81',ssUrlPrefix + 'smart-home/plc/features/index.htm','secondaryUrlVariableField==article');
g_navNode_5_2_1=g_navNode_5_2.addNode('16526','\u4ea7\u54c1\u5c55\u793a',ssUrlPrefix + 'smart-home/plc/gallery/index.htm','secondaryUrlVariableField==article');
g_navNode_5_2_2=g_navNode_5_2.addNode('16527','\u89c4\u683c\u53c2\u6570',ssUrlPrefix + 'smart-home/plc/tech-specs/index.htm','secondaryUrlVariableField==article');
g_navNode_5_2_3=g_navNode_5_2.addNode('16528','\u6280\u672f\u652f\u6301',ssUrlPrefix + 'smart-home/plc/support/index.htm','secondaryUrlVariableField==article');
g_navNode_5_2_3_0=g_navNode_5_2_3.addNode('16529','\u4ea7\u54c1\u624b\u518c',ssUrlPrefix + 'smart-home/plc/support/manuals/index.htm','secondaryUrlVariableField==article');
g_navNode_5_2_3_0_0=g_navNode_5_2_3_0.addNode('16530','\u8be6\u7ec6\u4fe1\u606f',ssUrlPrefix + 'smart-home/plc/support/manuals/detail/index.htm','secondaryUrlVariableField==article');
g_navNode_5_2_3_1=g_navNode_5_2_3.addNode('16531','\u8f6f\u4ef6\u4e0b\u8f7d',ssUrlPrefix + 'smart-home/plc/support/downloads/index.htm','secondaryUrlVariableField==article');
g_navNode_5_2_3_1_0=g_navNode_5_2_3_1.addNode('16532','\u8be6\u7ec6\u4fe1\u606f',ssUrlPrefix + 'smart-home/plc/support/downloads/detail/index.htm','secondaryUrlVariableField==article');
g_navNode_5_2_3_2=g_navNode_5_2_3.addNode('16533','\u5e38\u89c1\u95ee\u9898',ssUrlPrefix + 'smart-home/plc/support/faqs/index.htm','secondaryUrlVariableField==article');
g_navNode_5_3=g_navNode_5.addNode('16536','\u7535\u89c6\u76d2\u5b50',ssUrlPrefix + 'smart-home/mediaq/index.htm');
g_navNode_5_3_0=g_navNode_5_3.addNode('16537','\u529f\u80fd\u7279\u5f81',ssUrlPrefix + 'smart-home/mediaq/features/index.htm','secondaryUrlVariableField==article');
g_navNode_5_3_1=g_navNode_5_3.addNode('16538','\u4ea7\u54c1\u5c55\u793a',ssUrlPrefix + 'smart-home/mediaq/gallery/index.htm','secondaryUrlVariableField==article');
g_navNode_5_3_2=g_navNode_5_3.addNode('16539','\u89c4\u683c\u53c2\u6570',ssUrlPrefix + 'smart-home/mediaq/tech-specs/index.htm','secondaryUrlVariableField==article');
g_navNode_5_3_3=g_navNode_5_3.addNode('16540','\u6280\u672f\u652f\u6301',ssUrlPrefix + 'smart-home/mediaq/support/index.htm','secondaryUrlVariableField==article');
g_navNode_5_3_3_0=g_navNode_5_3_3.addNode('16541','\u4ea7\u54c1\u624b\u518c',ssUrlPrefix + 'smart-home/mediaq/support/manuals/index.htm','secondaryUrlVariableField==article');
g_navNode_5_3_3_0_0=g_navNode_5_3_3_0.addNode('16542','\u8be6\u7ec6\u4fe1\u606f',ssUrlPrefix + 'smart-home/mediaq/support/manuals/detail/index.htm','secondaryUrlVariableField==article');
g_navNode_5_3_3_1=g_navNode_5_3_3.addNode('16543','\u8f6f\u4ef6\u4e0b\u8f7d',ssUrlPrefix + 'smart-home/mediaq/support/downloads/index.htm','secondaryUrlVariableField==article');
g_navNode_5_3_3_1_0=g_navNode_5_3_3_1.addNode('16544','\u8be6\u7ec6\u4fe1\u606f',ssUrlPrefix + 'smart-home/mediaq/support/downloads/detail/index.htm','secondaryUrlVariableField==article');
g_navNode_5_3_3_2=g_navNode_5_3_3.addNode('16545','\u5e38\u89c1\u95ee\u9898',ssUrlPrefix + 'smart-home/mediaq/support/faqs/index.htm','secondaryUrlVariableField==article');
g_navNode_6=g_navNode_Root.addNode('6700','\u89e3\u51b3\u65b9\u6848',ssUrlPrefix + 'solutions/index.htm','externalUrl==\x3c\x21--\x24ssServerRelativeSiteRoot--\x3esolutions/m2m-solutions/overview/index.htm');
g_navNode_6_0=g_navNode_6.addNode('5061','\u6a21\u5757\u4ea7\u54c1\u89e3\u51b3\u65b9\u6848',ssUrlPrefix + 'solutions/m2m-solutions/index.htm','externalUrl==http\x3a//consumer.huawei.com/en/solutions/m2m-solutions/overview/index.htm/index.htm');
g_navNode_6_0_0=g_navNode_6_0.addNode('16700','\u8054\u7cfb\u6211\u4eec',ssUrlPrefix + 'solutions/m2m-solutions/contact-us/index.htm');
g_navNode_6_0_1=g_navNode_6_0.addNode('16701','\u6cd5\u5f8b\u58f0\u660e',ssUrlPrefix + 'solutions/m2m-solutions/terms-of-use/index.htm');
g_navNode_6_0_2=g_navNode_6_0.addNode('16702','\u9690\u79c1\u653f\u7b56',ssUrlPrefix + 'solutions/m2m-solutions/privacy-policy/index.htm');
g_navNode_6_0_3=g_navNode_6_0.addNode('5680','\u8054\u7cfb\u65b9\u5f0f',ssUrlPrefix + 'solutions/m2m-solutions/contact/index.htm');
g_navNode_6_0_4=g_navNode_6_0.addNode('6750','\u4ea7\u54c1\u6982\u89c8',ssUrlPrefix + 'solutions/m2m-solutions/overview/index.htm');
g_navNode_6_0_5=g_navNode_6_0.addNode('6751','\u4ea7\u54c1',ssUrlPrefix + 'solutions/m2m-solutions/products/index.htm');
g_navNode_6_0_5_0=g_navNode_6_0_5.addNode('7359','\u89c4\u683c\u53c2\u6570',ssUrlPrefix + 'solutions/m2m-solutions/products/tech-specs/index.htm','secondaryUrlVariableField==article');
g_navNode_6_0_5_1=g_navNode_6_0_5.addNode('7514','\u6280\u672f\u652f\u6301',ssUrlPrefix + 'solutions/m2m-solutions/products/support/index.htm');
g_navNode_6_0_5_1_0=g_navNode_6_0_5_1.addNode('7528','\u7528\u6237\u6307\u5357',ssUrlPrefix + 'solutions/m2m-solutions/products/support/user-guides/index.htm','secondaryUrlVariableField==article');
g_navNode_6_0_5_1_1=g_navNode_6_0_5_1.addNode('7562','\u5e94\u7528\u6307\u5357',ssUrlPrefix + 'solutions/m2m-solutions/products/support/application-guides/index.htm','secondaryUrlVariableField==article');
g_navNode_6_0_5_1_2=g_navNode_6_0_5_1.addNode('7573','\u4ea7\u54c1\u89c4\u683c',ssUrlPrefix + 'solutions/m2m-solutions/products/support/datasheets/index.htm','secondaryUrlVariableField==article');
g_navNode_6_0_5_1_3=g_navNode_6_0_5_1.addNode('7574','\u8ba4\u8bc1\u6587\u6863',ssUrlPrefix + 'solutions/m2m-solutions/products/support/certifications/index.htm','secondaryUrlVariableField==article');
g_navNode_6_0_5_1_4=g_navNode_6_0_5_1.addNode('16956','\u5e38\u89c1\u95ee\u9898',ssUrlPrefix + 'solutions/m2m-solutions/products/support/faqs/index.htm','secondaryUrlVariableField==article');
g_navNode_6_0_6=g_navNode_6_0.addNode('6752','\u65b0\u95fb',ssUrlPrefix + 'solutions/m2m-solutions/news/index.htm','secondaryUrlVariableField==article');
g_navNode_6_1=g_navNode_6.addNode('5681','\u79fb\u52a8\u529e\u516c\u7ec8\u7aef\u89e3\u51b3\u65b9\u6848',ssUrlPrefix + 'solutions/work-smart-solutions/index.htm');
g_navNode_6_1_0=g_navNode_6_1.addNode('16703','\u8054\u7cfb\u6211\u4eec',ssUrlPrefix + 'solutions/work-smart-solutions/contact-us/index.htm');
g_navNode_6_1_1=g_navNode_6_1.addNode('16704','\u6cd5\u5f8b\u58f0\u660e',ssUrlPrefix + 'solutions/work-smart-solutions/terms-of-use/index.htm');
g_navNode_6_1_2=g_navNode_6_1.addNode('16705','\u9690\u79c1\u653f\u7b56',ssUrlPrefix + 'solutions/work-smart-solutions/privacy-policy/index.htm');
g_navNode_6_1_3=g_navNode_6_1.addNode('5810','\u89e3\u51b3\u65b9\u6848',ssUrlPrefix + 'solutions/work-smart-solutions/solution/index.htm','secondaryUrlVariableField==article');
g_navNode_6_1_4=g_navNode_6_1.addNode('5847','\u6210\u529f\u6848\u4f8b',ssUrlPrefix + 'solutions/work-smart-solutions/case-study/index.htm','secondaryUrlVariableField==article');
g_navNode_6_1_5=g_navNode_6_1.addNode('6756','\u6982\u89c8',ssUrlPrefix + 'solutions/work-smart-solutions/overview/index.htm');
g_navNode_6_1_6=g_navNode_6_1.addNode('6764','Platform \x26 Products',ssUrlPrefix + 'solutions/work-smart-solutions/platform-products/index.htm');
g_navNode_6_1_7=g_navNode_6_1.addNode('6767','\u65b0\u95fb',ssUrlPrefix + 'solutions/work-smart-solutions/news/index.htm','secondaryUrlVariableField==article');
g_navNode_7=g_navNode_Root.addNode('2637','\u670d\u52a1\u4e0e\u652f\u6301',ssUrlPrefix + 'support/index.htm');
g_navNode_7_0=g_navNode_7.addNode('16770','\u79fb\u52a8\u5bbd\u5e26',ssUrlPrefix + 'support/mobile-broadband/index.htm','secondaryUrlVariableField==article');
g_navNode_7_1=g_navNode_7.addNode('16769','\u914d\u4ef6',ssUrlPrefix + 'support/accessories/index.htm','secondaryUrlVariableField==article');
g_navNode_7_2=g_navNode_7.addNode('16742','\u667a\u80fd\u5bb6\u5c45',ssUrlPrefix + 'support/smart-home/index.htm','secondaryUrlVariableField==article');
g_navNode_7_3=g_navNode_7.addNode('16741','\u5e73\u677f\u7535\u8111',ssUrlPrefix + 'support/tablets/index.htm','secondaryUrlVariableField==article');
g_navNode_7_4=g_navNode_7.addNode('16740','\u7a7f\u6234\u8bbe\u5907',ssUrlPrefix + 'support/wearables/index.htm','secondaryUrlVariableField==article');
g_navNode_7_5=g_navNode_7.addNode('16739','\u667a\u80fd\u624b\u673a',ssUrlPrefix + 'support/mobile-phones/index.htm','secondaryUrlVariableField==article');
g_navNode_7_6=g_navNode_7.addNode('10001','\u5e38\u89c1\u95ee\u9898',ssUrlPrefix + 'support/faqs/index.htm');
g_navNode_7_7=g_navNode_7.addNode('10003','\u670d\u52a1\u4e2d\u5fc3',ssUrlPrefix + 'support/service-center/index.htm');
g_navNode_7_8=g_navNode_7.addNode('7042','\u516c\u544a',ssUrlPrefix + 'support/notice/index.htm');
g_navNode_7_8_0=g_navNode_7_8.addNode('7092','Detail',ssUrlPrefix + 'support/notice/detail/index.htm');
g_navNode_7_9=g_navNode_7.addNode('7387','\u641c\u7d22',ssUrlPrefix + 'support/search/index.htm');
g_navNode_7_10=g_navNode_7.addNode('10516','\u96f6\u552e\u5e97',ssUrlPrefix + 'support/where-to-buy/index.htm');
g_navNode_7_11=g_navNode_7.addNode('10521','\u4fdd\u4fee\u653f\u7b56',ssUrlPrefix + 'support/warranty-policy/index.htm');
g_navNode_7_11_0=g_navNode_7_11.addNode('10531','\u624b\u673a/\u5e73\u677f\u7535\u8111',ssUrlPrefix + 'support/warranty-policy/mobile-phone/index.htm');
g_navNode_7_11_1=g_navNode_7_11.addNode('10532','\u65e0\u7ebf\u5bbd\u5e26\u4ea7\u54c1',ssUrlPrefix + 'support/warranty-policy/portable-internet/index.htm');
g_navNode_7_11_2=g_navNode_7_11.addNode('10533','\u53ef\u7a7f\u6234\u4ea7\u54c1',ssUrlPrefix + 'support/warranty-policy/wearables/index.htm');
g_navNode_7_11_3=g_navNode_7_11.addNode('10534','\u667a\u80fd\u5bb6\u5ead\u4ea7\u54c1',ssUrlPrefix + 'support/warranty-policy/smart-home/index.htm');
g_navNode_7_12=g_navNode_7.addNode('13277','\u7ef4\u4fee\u8fdb\u5ea6',ssUrlPrefix + 'support/inquiry/index.htm');
g_navNode_7_13=g_navNode_7.addNode('14314','\u5982\u4f55\u67e5\u627e\u60a8\u7684\u4ea7\u54c1\u578b\u53f7?',ssUrlPrefix + 'support/find-model/index.htm');
g_navNode_7_14=g_navNode_7.addNode('14998','\u5bc4\u4fee\u670d\u52a1',ssUrlPrefix + 'support/express-repair/index.htm');
g_navNode_7_15=g_navNode_7.addNode('15022','\u624b\u673a\u771f\u4f2a\u9274\u522b',ssUrlPrefix + 'support/distinguish/index.htm');
g_navNode_7_15_0=g_navNode_7_15.addNode('15023','\u624b\u673a',ssUrlPrefix + 'support/distinguish/mobile-phone/index.htm');
g_navNode_7_16=g_navNode_7.addNode('14310','\u7ef4\u4fee\u914d\u4ef6\u4ef7\u683c\u67e5\u8be2',ssUrlPrefix + 'support/sparepart-price/index.htm');
g_navNode_7_17=g_navNode_7.addNode('15440','\u9884\u7ea6\u670d\u52a1',ssUrlPrefix + 'support/reservation/index.htm');
g_navNode_7_18=g_navNode_7.addNode('15697','\u6280\u672f\u652f\u6301\u5217\u8868',ssUrlPrefix + 'support/supportlist/index.htm');
g_navNode_8=g_navNode_Root.addNode('2630','\u65b0\u95fb\u4e2d\u5fc3',ssUrlPrefix + 'press/index.htm','externalUrl==\x3c\x21--\x24ssServerRelativeSiteRoot--\x3epress/news/index.htm');
g_navNode_8_0=g_navNode_8.addNode('2632','\u534e\u4e3a\u65b0\u95fb',ssUrlPrefix + 'press/news/index.htm','contributorOnly==false','secondaryUrlVariableField==article');
g_navNode_8_1=g_navNode_8.addNode('2633','\u5a92\u4f53\u62a5\u9053',ssUrlPrefix + 'press/media-coverage/index.htm','secondaryUrlVariableField==article');
g_navNode_8_2=g_navNode_8.addNode('2634','\u8363\u8a89\u5802',ssUrlPrefix + 'press/awards/index.htm','secondaryUrlVariableField==article');
g_navNode_8_3=g_navNode_8.addNode('2635','\u8fc7\u5f80\u6d3b\u52a8',ssUrlPrefix + 'press/events/index.htm','secondaryUrlVariableField==article');
g_navNode_8_4=g_navNode_8.addNode('10760','\u534e\u4e3a\u89c6\u9891',ssUrlPrefix + 'press/video/index.htm','secondaryUrlVariableField==article');
g_navNode_9=g_navNode_Root.addNode('7525','\u8054\u7cfb\u6211\u4eec',ssUrlPrefix + 'contact-us/index.htm');
g_navNode_10=g_navNode_Root.addNode('8912','\u7f51\u7ad9\u5730\u56fe',ssUrlPrefix + 'site-map/index.htm','secondaryUrlVariableField==article111');
g_navNode_11=g_navNode_Root.addNode('6417','\u9690\u79c1\u653f\u7b56',ssUrlPrefix + 'privacy-policy/index.htm');
g_navNode_12=g_navNode_Root.addNode('6418','\u6cd5\u5f8b\u58f0\u660e',ssUrlPrefix + 'terms-of-use/index.htm');
g_navNode_13=g_navNode_Root.addNode('10906','\u641c\u7d22',ssUrlPrefix + 'search/index.htm');
