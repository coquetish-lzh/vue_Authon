let nums=[2,18,17,42,6]
var containsDuplicate = function(nums) {
    let newSet = new Set(nums)
    let setList={...newSet}
    console.log(setList)
    if(setList.length<nums.length) return true;
    return false;
}
containsDuplicate(nums) 