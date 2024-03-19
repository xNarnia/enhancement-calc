var delayed = false;
var delayCallbackId;

// Protect user from accidentally downgrading their high upgraded equips with a small delay
function delay()
{
    if(delayed == true)
        return;

    delayed = true;
    delayCallbackId = setTimeout(clearDelay, 500);
}

function clearDelay()
{
    delayed = false;
    clearTimeout(delayCallbackId);
}

// Array of Loot Tables, where [index] is the enhancement level
// Without El Hammer
var NPCEnhancementTable = [
    new LootTable(),
    new LootTable(),
    new LootTable(),
    new LootTable(),
    new LootTable(),
    new LootTable(),
    new LootTable(),
    new LootTable(),
    new LootTable(),
    new LootTable(),
    new LootTable(),
    new LootTable(),
    new LootTable()
];

// With El Hammer
var HammerNPCEnhancementTable = [
    new LootTable(),
    new LootTable(),
    new LootTable(),
    new LootTable(),
    new LootTable(),
    new LootTable(),
    new LootTable(),
    new LootTable(),
    new LootTable(),
    new LootTable(),
    new LootTable(),
    new LootTable(),
    new LootTable()
];

// I made this code in Google Spreadsheets and I'm too lazy to use a CSV file to import, don't judge me
// Table RNG rates without El Hammer
NPCEnhancementTable[0].add('Success', 10000);	NPCEnhancementTable[0].add('Destroy', 0);	NPCEnhancementTable[0].add('No Change', 0);	NPCEnhancementTable[0].add('Downgrade', 0);	NPCEnhancementTable[0].add('Reset', 0);
NPCEnhancementTable[1].add('Success', 10000);	NPCEnhancementTable[1].add('Destroy', 0);	NPCEnhancementTable[1].add('No Change', 0);	NPCEnhancementTable[1].add('Downgrade', 0);	NPCEnhancementTable[1].add('Reset', 0);
NPCEnhancementTable[2].add('Success', 9450);	NPCEnhancementTable[2].add('Destroy', 0);	NPCEnhancementTable[2].add('No Change', 550);	NPCEnhancementTable[2].add('Downgrade', 0);	NPCEnhancementTable[2].add('Reset', 0);
NPCEnhancementTable[3].add('Success', 8400);	NPCEnhancementTable[3].add('Destroy', 0);	NPCEnhancementTable[3].add('No Change', 1600);	NPCEnhancementTable[3].add('Downgrade', 0);	NPCEnhancementTable[3].add('Reset', 0);
NPCEnhancementTable[4].add('Success', 7350);	NPCEnhancementTable[4].add('Destroy', 0);	NPCEnhancementTable[4].add('No Change', 2600);	NPCEnhancementTable[4].add('Downgrade', 0);	NPCEnhancementTable[4].add('Reset', 0);
NPCEnhancementTable[5].add('Success', 6300);	NPCEnhancementTable[5].add('Destroy', 0);	NPCEnhancementTable[5].add('No Change', 3700);	NPCEnhancementTable[5].add('Downgrade', 0);	NPCEnhancementTable[5].add('Reset', 0);
NPCEnhancementTable[6].add('Success', 2100);	NPCEnhancementTable[6].add('Destroy', 0);	NPCEnhancementTable[6].add('No Change', 7900);	NPCEnhancementTable[6].add('Downgrade', 0);	NPCEnhancementTable[6].add('Reset', 0);
NPCEnhancementTable[7].add('Success', 525);	NPCEnhancementTable[7].add('Destroy', 0);	NPCEnhancementTable[7].add('No Change', 1475);	NPCEnhancementTable[7].add('Downgrade', 3000);	NPCEnhancementTable[7].add('Reset', 5000);
NPCEnhancementTable[8].add('Success', 210);	NPCEnhancementTable[8].add('Destroy', 2000);	NPCEnhancementTable[8].add('No Change', 990);	NPCEnhancementTable[8].add('Downgrade', 2800);	NPCEnhancementTable[8].add('Reset', 4000);
NPCEnhancementTable[9].add('Success', 105);	NPCEnhancementTable[9].add('Destroy', 2500);	NPCEnhancementTable[9].add('No Change', 695);	NPCEnhancementTable[9].add('Downgrade', 2700);	NPCEnhancementTable[9].add('Reset', 4000);
NPCEnhancementTable[10].add('Success', 74);	NPCEnhancementTable[10].add('Destroy', 3530);	NPCEnhancementTable[10].add('No Change', 697);	NPCEnhancementTable[10].add('Downgrade', 2700);	NPCEnhancementTable[10].add('Reset', 3000);
NPCEnhancementTable[11].add('Success', 105);	NPCEnhancementTable[11].add('Destroy', 2500);	NPCEnhancementTable[11].add('No Change', 695);	NPCEnhancementTable[11].add('Downgrade', 2700);	NPCEnhancementTable[11].add('Reset', 4000);
NPCEnhancementTable[12].add('Success', 105);	NPCEnhancementTable[12].add('Destroy', 2900);	NPCEnhancementTable[12].add('No Change', 295);	NPCEnhancementTable[12].add('Downgrade', 2700);	NPCEnhancementTable[12].add('Reset', 4000);

// Table RNG rates with El Hammer
HammerNPCEnhancementTable[0].add('Success', 10000);	HammerNPCEnhancementTable[0].add('Destroy', 0);	HammerNPCEnhancementTable[0].add('No Change', 0);	HammerNPCEnhancementTable[0].add('Downgrade', 0);	HammerNPCEnhancementTable[0].add('Reset', 0);
HammerNPCEnhancementTable[1].add('Success', 10000);	HammerNPCEnhancementTable[1].add('Destroy', 0);	HammerNPCEnhancementTable[1].add('No Change', 0);	HammerNPCEnhancementTable[1].add('Downgrade', 0);	HammerNPCEnhancementTable[1].add('Reset', 0);
HammerNPCEnhancementTable[2].add('Success', 10000);	HammerNPCEnhancementTable[2].add('Destroy', 0);	HammerNPCEnhancementTable[2].add('No Change', 0);	HammerNPCEnhancementTable[2].add('Downgrade', 0);	HammerNPCEnhancementTable[2].add('Reset', 0);
HammerNPCEnhancementTable[3].add('Success', 10000);	HammerNPCEnhancementTable[3].add('Destroy', 0);	HammerNPCEnhancementTable[3].add('No Change', 0);	HammerNPCEnhancementTable[3].add('Downgrade', 0);	HammerNPCEnhancementTable[3].add('Reset', 0);
HammerNPCEnhancementTable[4].add('Success', 10000);	HammerNPCEnhancementTable[4].add('Destroy', 0);	HammerNPCEnhancementTable[4].add('No Change', 0);	HammerNPCEnhancementTable[4].add('Downgrade', 0);	HammerNPCEnhancementTable[4].add('Reset', 0);
HammerNPCEnhancementTable[5].add('Success', 10000);	HammerNPCEnhancementTable[5].add('Destroy', 0);	HammerNPCEnhancementTable[5].add('No Change', 0);	HammerNPCEnhancementTable[5].add('Downgrade', 0);	HammerNPCEnhancementTable[5].add('Reset', 0);
HammerNPCEnhancementTable[6].add('Success', 4200);	HammerNPCEnhancementTable[6].add('Destroy', 0);	HammerNPCEnhancementTable[6].add('No Change', 5800);	HammerNPCEnhancementTable[6].add('Downgrade', 0);	HammerNPCEnhancementTable[6].add('Reset', 0);
HammerNPCEnhancementTable[7].add('Success', 1050);	HammerNPCEnhancementTable[7].add('Destroy', 0);	HammerNPCEnhancementTable[7].add('No Change', 950);	HammerNPCEnhancementTable[7].add('Downgrade', 3000);	HammerNPCEnhancementTable[7].add('Reset', 5000);
HammerNPCEnhancementTable[8].add('Success', 420);	HammerNPCEnhancementTable[8].add('Destroy', 2000);	HammerNPCEnhancementTable[8].add('No Change', 780.);	HammerNPCEnhancementTable[8].add('Downgrade', 2800);	HammerNPCEnhancementTable[8].add('Reset', 4000);
HammerNPCEnhancementTable[9].add('Success', 210);	HammerNPCEnhancementTable[9].add('Destroy', 2500);	HammerNPCEnhancementTable[9].add('No Change', 590);	HammerNPCEnhancementTable[9].add('Downgrade', 2700);	HammerNPCEnhancementTable[9].add('Reset', 4000);
HammerNPCEnhancementTable[10].add('Success', 148);	HammerNPCEnhancementTable[10].add('Destroy', 3530);	HammerNPCEnhancementTable[10].add('No Change', 623);	HammerNPCEnhancementTable[10].add('Downgrade', 2700);	HammerNPCEnhancementTable[10].add('Reset', 3000);
HammerNPCEnhancementTable[11].add('Success', 210);	HammerNPCEnhancementTable[11].add('Destroy', 2500);	HammerNPCEnhancementTable[11].add('No Change', 590);	HammerNPCEnhancementTable[11].add('Downgrade', 2700);	HammerNPCEnhancementTable[11].add('Reset', 4000);
HammerNPCEnhancementTable[12].add('Success', 210);	HammerNPCEnhancementTable[12].add('Destroy', 2900);	HammerNPCEnhancementTable[12].add('No Change', 190);	HammerNPCEnhancementTable[12].add('Downgrade', 2700);	HammerNPCEnhancementTable[12].add('Reset', 4000);

// Stat modifier (+[13] is 335% stronger than +0)
var enhanceMultiplier = [];

enhanceMultiplier[0] = 1.00;
enhanceMultiplier[1] = 1.03;
enhanceMultiplier[2] = 1.06;
enhanceMultiplier[3] = 1.09;
enhanceMultiplier[4] = 1.16;
enhanceMultiplier[5] = 1.23;
enhanceMultiplier[6] = 1.30;
enhanceMultiplier[7] = 1.45;
enhanceMultiplier[8] = 1.60;
enhanceMultiplier[9] = 1.75;
enhanceMultiplier[10] = 2.15;
enhanceMultiplier[11] = 2.55;
enhanceMultiplier[12] = 2.95;
enhanceMultiplier[13] = 3.35;

// State variables
var enhanceLevel = 0;
var usingElHammer = false;
var usingRestorationScroll = false;

var basehp = 10000;
var basePatk = 1000;
var baseMatk = 1000;
var basePdef = 100;
var baseMdef = 100;

var brokenCount = 0;
var stonesUsed = 0;
var oresUsed = 0;
var crystalsUsed = 0;

function updateStatLabels(){
    $(".enhanceLvl").text(enhanceLevel);
    $(".row.brokenCount > .value").text(brokenCount);
    $(".row.stonesUsed > .value").text(stonesUsed);
    $(".row.oresUsed > .value").text(oresUsed);
    $(".row.crystalsUsed > .value").text(crystalsUsed);
}

function enhance(protected, result = "") {
    var table;
    if(usingElHammer)
        table = HammerNPCEnhancementTable;
    else
        table = NPCEnhancementTable;

    // Result = "" implies no enhancement has taken place and must be rolled for
    if(result == ""){
        // If user tries to enhance above +13, just use +12 enhancement rate for infinity
        if(enhanceLevel <= 12)
            result = table[enhanceLevel].choose();
        else
            result = table[12].choose();
    }

    switch(result){
        case "Success":
            if(enhanceLevel > 7)
                delay();

            enhanceLevel++;
            break;
        case "Destroy":
            brokenCount++;
            break;
        case "Downgrade":
            if(!protected || enhanceLevel > 10)
                enhanceLevel--;
            else
                result = "No Change";

            break;
        case "Reset":
            if(!protected)
                enhanceLevel = 0;
            else
                result = "No Change";

            break;
        case "No Change":
            break;
    }

    // Update labels
    $(".enhanceLvl").text(enhanceLevel);
    $(".row.brokenCount > .value").text(brokenCount);
    $(".row.stonesUsed > .value").text(stonesUsed);
    $(".row.oresUsed > .value").text(oresUsed);
    $(".row.crystalsUsed > .value").text(crystalsUsed);

    // Set button states based on Enhancement Level
    if(enhanceLevel < 11)
        $("#oreEnhance").prop("disabled", false);
    else
        $("#oreEnhance").prop("disabled", true);

    if(enhanceLevel >= 11)
        $("#crystalEnhance").prop("disabled", false);
    else
        $("#crystalEnhance").prop("disabled", true);

    var multiplier = 1.0;
    if(enhanceLevel <= 13)
        multiplier = enhanceMultiplier[enhanceLevel];
    else
        multiplier = enhanceMultiplier[13] + (enhanceLevel - 13) * .4;

    // Update stat labels with updated enhancement % modifier 
    updateStatLabels();

    // Remove any enhancement state images
    // Use "hasClass" to ensure image is on page before using removeClass (faster to do this than to just remove outright)
    if($(".result").hasClass("success"))
        $(".result").removeClass("success");
    if($(".result").hasClass("destroy"))
        $(".result").removeClass("destroy");
    if($(".result").hasClass("downgrade"))
        $(".result").removeClass("downgrade");
    if($(".result").hasClass("reset"))
        $(".result").removeClass("reset");
    if($(".result").hasClass("nochange"))
        $(".result").removeClass("nochange");

    switch(result)
    {
        case "Success":
            $(".result").addClass("success");
            break;
        case "Destroy":
            $(".result").addClass("destroy");
            break;
        case "Downgrade":
            $(".result").addClass("downgrade");
            break;
        case "Reset":
            $(".result").addClass("reset");
            break;
        case "No Change":
            $(".result").addClass("nochange");
            break;
    }
}

$(document).ready(function() {
    if(enhanceLevel < 11)
        $("#oreEnhance").prop("disabled", false);
    else
        $("#oreEnhance").prop("disabled", true);

    if(enhanceLevel >= 11)
        $("#crystalEnhance").prop("disabled", false);
    else
        $("#crystalEnhance").prop("disabled", true);

    // Force Enhance Buttons
    $("#enhanceReset").click(function() {
        enhance(false, "Reset");
    });
    $("#forceUpgrade").click(function() {
        enhance(false, "Success");
    });
    $("#forceDowngrade").click(function() {
        if(enhanceLevel <= 0)
            return;

        enhance(false, "Downgrade");
    });
    $("#resetClicks").click(function () {
        brokenCount = 0;
        stonesUsed = 0;
        oresUsed = 0;
        crystalsUsed = 0;
        updateStatLabels();
    });
    // Enhance Buttons
    $("#normalEnhance").click(function() {
        if(delayed)
            return;

        enhance(false);
        stonesUsed++;
    });
    $("#oreEnhance").click(function() {
        if(delayed)
            return;

        enhance(true);
        stonesUsed++;
        oresUsed++;
    });
    $("#crystalEnhance").click(function() {
        if(delayed)
            return;

        enhance(true);
        stonesUsed++;
        crystalsUsed++;
    });
    $("#elHammerCheck").click(function () {
        if($("#elHammerCheck").prop("checked"))
        {
            usingElHammer = true;
        }
        else
        {
            usingElHammer = false;
        }
    });
});