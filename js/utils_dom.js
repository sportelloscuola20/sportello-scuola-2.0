(function(){
  function removeEmptySidebarBoxes(){
    var side = document.querySelector('aside, .sidebar, #sidebar, .right-column, .right-col, .sidecol');
    if(!side) return;
    Array.from(side.children).forEach(function(node){
      var txt = (node.textContent||'').trim();
      var h = node.offsetHeight || 0;
      var hasContent = node.querySelector && node.querySelector('*');
      if(txt==='' && !hasContent && h<40){
        node.parentNode.removeChild(node);
      }
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', removeEmptySidebarBoxes);
  else removeEmptySidebarBoxes();
})();