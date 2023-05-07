import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  tempIncrement = [];
  properties = [];
  units = [];
  factors = [];
  propertyIndex;

  constructor(private fb: FormBuilder) {
    this.properties[0] = "Area";
    this.units[0] = ["Acre (acre)", "Are", "Barn (barn)", "Circular mil", "Hectare", "Rood", "Square centimeter", "Square foot (ft^2)", "Square inch (in^2)", "Square kilometer", "Square meter (m^2)", "Square mile (mi^2)", "Square yard (yd^2)"];
    this.factors[0] = [4046.856, 100, 1E-28, 5.067075E-10, 10000, 1011.71413184285, .0001, 9.290304E-02, 6.4516E-04, 1000000, 1, 2589988, 0.8361274];

    this.properties[1] = "Length";
    this.units[1] = ["Angstrom (A')", "Astronomical unit (AU)", "Caliber (cal)", "Centimeter (cm)", "Ell", "Em", "Fathom", "Fermi (fm)", "Foot (ft)", "Furlong", "Inch (in)", "Kilometer (km)", "League (int'l)", "League (UK)", "Light year (LY)", "Meter (m)", "Micrometer (mu-m)", "Mil", "Mile (int'l nautical)", "Mile (UK nautical)", "Mile (US nautical)", "Mile (US statute)", "Millimeter (mm)", "Nanometer (nm)", "Parsec", "Pica (printer)", "Picometer (pm)", "Point (pt)", "Rod", "Yard (yd)"];
    this.factors[1] = [1E-10, 1.49598E+11, .000254, .01, 1.143, 4.2323E-03, 1.8288, 1E-15, .3048, 201.168, .0254, 1000, 5556, 5556, 9.46055E+15, 1, .000001, .0000254, 1852, 1853.184, 1852, 1609.344, .001, 1E-09, 3.08374E+16, 4.217518E-03, 1E-12, .0003514598, 5.0292, .9144];

    this.properties[2] = "Mass";
    this.units[2] = ["Carat (metric)(ct)", "Gram (gr)", "Hundredweight (long)", "Hundredweight (short)", "Kilogram (kgr)", "Microgram (mu-gr)", "Milligram (mgr)", "Ounce mass (ozm)", "Ounce mass (troy)", "Pound mass (lbm)", "Pound mass (troy)", "Slug", "Ton (assay)", "Ton (long)", "Ton (metric)", "Ton (short)", "Tonne"];
    this.factors[2] = [.0002, .001, 50.80235, 45.35924, 1, .000000001, 1E-06, .02834952, .03110348, .4535924, .3732417, 14.5939, .02916667, 1016.047, 1000, 907.1847, 1000];

    this.properties[3] = "Pressure & Stress";
    this.units[3] = ["Atmosphere (normal)", "Atmosphere (techinical)", "Bar", "Centimeter mercury(cmHg)", "Centimeter water (4'C)", "Decibar", "Kgr force/sq.centimeter", "Kgr force/sq.meter", "Kilopascal (kPa)", "Kip/square inch", "Megapascal (Mpa)", "Millibar", "Millimeter mercury(mmHg)", "Newton/sq.meter", "Pascal (Pa)", "Pound-force/sq.foot", "Pound-force/sq.inch (psi)", "Poundal/sq.foot", "Torr (mmHg,0'C)"];
    this.factors[3] = [101325, 98066.5, 100000, 1333.22, 98.0638, 10000, 98066.5, 9.80665, 1000, 6894757, 1000000, 100, 133.3224, 1, 1, 47.88026, 6894.757, 47.88026, 133.322];

    this.properties[4] = "Temperature";
    this.units[4] = ["Degrees Celsius ('C)", "Degrees Fahrenheit ('F)", "Degrees Kelvin ('K)", "Degrees Rankine ('R)"];
    this.factors[4] = [1, 0.555555555555, 1, 0.555555555555];
    this.tempIncrement = [0, -32, -273.15, -491.67];

    this.properties[5] = "Velocity & Speed";
    this.units[5] = ["Foot/minute (ft/min)", "Foot/second (ft/sec)", "Kilometer/hour (kph)", "Knot (int'l)", "Mach (STP)(a)", "Meter/second (m/sec)", "Mile (nautical)/hour", "Mile (US)/hour (mph)", "Mile (US)/minute", "Mile (US)/second", "Speed of light (c)"];
    this.factors[5] = [5.0E-03, .3048, .2777778, .5144444, 340.0068750, 1, .514444, .44707, 26.8224, 1609.344, 299792458];

    this.properties[6] = "Volume & Capacity";
    this.units[6] = ["Acre-foot", "Barrel (oil)", "Board foot", "Bushel (US)", "Cubic centimeter", "Cubic foot", "Cubic inch (in^3)", "Cubic Meter (m^3)", "Cubic millimeter", "Cubic yard", "Cup", "Fluid ounce (US)", "Gallon (UK)", "Gallon (US,dry)", "Gallon (US,liq)", "Gill (UK)", "Gill (US)", "Liter (new)", "Liter (old)", "Ounce (UK,fluid)", "Ounce (US,fluid)", "Peck (US)", "Pint (US,dry)", "Pint (US,liq)", "Quart (US,dry)", "Quart (US,liq)", "Stere", "Tablespoon", "Teaspoon", "Ton (register)"];
    this.factors[6] = [1233.482, .1589873, .002359737, .03523907, .000001, .02831685, .00001638706, 1, .000000001, .7645549, .0002365882, .00002957353, .004546087, .004404884, .003785412, .0001420652, .0001182941, .001, .001000028, .00002841305, .00002957353, 8.8097680e-03, .0005506105, 4.7317650e-04, .001101221, 9.46353E-04, 1, .00001478676, .000004928922, 2.831685];
  }

  propertyChanged() {
    alert('')
    const property = this.form.get('property').value;

    for (let i = 0; i < this.properties.length; i++) {
      if (property === this.properties[i]) this.propertyIndex = i;
    }

    this.form.get('from').setValue(this.units[this.propertyIndex][0]);
    this.form.get('to').setValue(this.units[this.propertyIndex][1]);

    this.calculate('from', 'to');
  }

  calculate(sourceInput, targetInput) {
    let sourceValue = this.form.get(sourceInput + 'Value').value;

    // First check if the user has given numbers or anything that can be made to one...
    if (isNaN(parseFloat(sourceValue))) return;

    // Converts the contents of the sourceForm input box to the units specified in the targetForm unit menu and puts the result in the targetForm input box.In other words, this is the heart of the whole script...
    let sourceIndex;
    let sourceFactor;
    let targetIndex;
    let targetFactor;
    let result;

    // Let's determine what unit are we converting FROM (i.e. source) and the factor needed to convert that unit to the base unit.
    const unitFrom = this.form.get(sourceInput).value;
    for (let i = 0; i < this.units[this.propertyIndex].length; i++) {
      if (unitFrom === this.units[this.propertyIndex][i]) sourceIndex = i;
    }

    const unitTo = this.form.get(targetInput).value;
    for (let i = 0; i < this.units[this.propertyIndex].length; i++) {
      if (unitTo === this.units[this.propertyIndex][i]) targetIndex = i;
    }


    sourceFactor = this.factors[this.propertyIndex][sourceIndex];
    targetFactor = this.factors[this.propertyIndex][targetIndex];

    // a) convert the source TO the base unit: (The input has been checked by the CalculateUnit function).

    result = this.form.get(sourceInput + 'Value').value;
    // Handle Temperature increments!
    if (this.properties[this.propertyIndex] == "Temperature") {
      result = parseFloat(result) + this.tempIncrement[sourceIndex];
    }
    result = result * sourceFactor;

    // not done yet... now, b) use the targetFactor to convert FROM the base unit
    // to the target unit...
    result = result / targetFactor;
    // Again, handle Temperature increments!
    if (this.properties[this.propertyIndex] == "Temperature") {
      result = parseFloat(result) - this.tempIncrement[targetIndex];
    }

    // Ta-da! All that's left is to update the target input box:
    this.form.get(targetInput + 'Value').setValue(result.toFixed(2));
  }

  ngOnInit() {
    this.propertyIndex = 0;
    this.form = this.fb.group({
      property: [this.properties[this.propertyIndex]],
      from: [this.units[this.propertyIndex][0]],
      to: [this.units[this.propertyIndex][1]],
      fromValue: [],
      toValue: []
    });
  }

}
