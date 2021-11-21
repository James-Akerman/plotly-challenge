// The option changed function
function optionChanged(){
  // GET THE SELECT OPTION VALUE
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");
  // When the value in the select box changes, then change the horizontal bar chart
  filteredSampleData = samples.filter(entry => entry.id === dataset)[0];
  
  // HORIZONTAL BAR GRAPH
  // Select top 10 sample values
  let top_ten_sample_values = filteredSampleData.sample_values.slice(0, 10).reverse();
  let top_ten_sample_otu_ids = filteredSampleData.otu_ids.map(entry => 'OTU ' + entry).slice(0, 10).reverse();
  let top_ten_sample_otu_labels = filteredSampleData.otu_labels.slice(0, 10).reverse();
  // Create a trace object
  let bar_trace1 = {
    x: top_ten_sample_values,
    y: top_ten_sample_otu_ids,
    text: top_ten_sample_otu_labels,
    type: "bar",
    orientation: "h"
  };
  // Create a data array with the above trace
  let bar_data = [bar_trace1];
  // Use `layout` to define a title
  Plotly.newPlot("bar", bar_data);

  // DEMOGRAPHIC INFO
  filteredMetaData = metadata.filter(entry => entry.id === parseInt(dataset))[0];
  // console.log(filteredMetaData);
  let tbody = d3.select("#sample-metadata").append("tbody");
  for (const [key, value] of Object.entries(filteredMetaData)) {
    let row = tbody.append("tr");
    var cell = row.append("td");
    cell.text(`${key}: ${value}`);
  };

  // BUBBLE CHART
  var bubble_trace1 = {
      x: filteredSampleData.otu_ids,
      y: filteredSampleData.sample_values,
      mode: 'markers',
      text: filteredSampleData.otu_labels,
      marker: {
        size: filteredSampleData.sample_values,
        color: filteredSampleData.otu_ids,
        colorscale: 'Earth'
      }
  };
  var bubble_data = [bubble_trace1];
  var bubble_layout = {
      showlegend: false,
      xaxis: {
        title: 'OTU ID'
      }
  };
  Plotly.newPlot('bubble', bubble_data, bubble_layout);

  // GAUGE CHART
  console.log(wfreq = filteredMetaData["wfreq"]); 
  wfreq = filteredMetaData["wfreq"];
  var new_path = "";
 switch (wfreq = filteredMetaData["wfreq"]) {
          case wfreq === 0:
              new_path =  'M 0.50 0.49 L 0.38 0.55 L 0.51 0.52 Z';
              break;
            case wfreq === 1:
              new_path = 'M 0.50 0.49 L 0.38 0.63 L 0.51 0.52 Z';
              break;
            case wfreq === '2':
              new_path = 'M 0.50 0.49 L 0.42 0.68 L 0.51 0.52 Z';
              break;
            case wfreq === 3:
              new_path = 'M 0.50 0.49 L 0.46 0.72 L 0.52 0.5 Z';
              break;
            case wfreq === 4:
              new_path = 'M 0.50 0.49 L 0.50 0.72 L 0.52 0.5 Z';
              break;
            case wfreq === 5:
              new_path = 'M 0.50 0.51 L 0.54 0.72 L 0.52 0.5 Z';
              break;
            case wfreq === 6:
              new_path =  'M 0.51 0.53 L 0.57 0.68 L 0.52 0.5 Z';
              break;
            case wfreq === 7:
              new_path = 'M 0.51 0.53 L 0.60 0.62 L 0.52 0.5 Z';
              break;
            case wfreq === 8:
              new_path = 'M 0.52 0.53 L 0.63 0.55 L 0.52 0.5 Z'
              break;
          };

      console.log(new_path);

    gauge_data = [{
      values: [45, 5, 5, 5, 5, 5, 5, 5, 5,5],
      labels: [" ", "0-1", "1-2", "2-3", "3-4", "4-5","5-6","6-7","7-8","8-9"],
      marker: {
          'colors': [
              'rgb(255, 255, 255)',
              'rgb(232,226,202)',
              'rgb(226,210,172)',
              'rgb(223,189,139)',
              'rgb(223,162,103)',
              'rgb(226,126,64)',
              'rgb(232,226,202)',
              'rgb(226,210,172)',
              'rgb(223,189,139)',
              'rgb(223,162,103)',
              'rgb(226,126,64)'
          ]
      },
      domain: {"x": [0, 1]},
      name: "Gauge",
      hole: .3,
      type: "pie",
      direction: "clockwise",
      rotation: 90,
      showlegend: false,
      textinfo: "label",
      textposition: "inside",
      hoverinfo: "none"
  }]
  gauge_layout = {
    title: { 
      text: "Belly Button Washing Frequency".bold() + "<br>" + 'Scrubs per Week', 
    },
    shapes: [
        {
          path: new_path,
          
          // // 0-1
          // path: 'M 0.50 0.49 L 0.38 0.55 L 0.51 0.52 Z',
          // // 1-2
          // // path: 'M 0.50 0.49 L 0.38 0.63 L 0.51 0.52 Z',
          // // 2-3
          // // path: 'M 0.50 0.49 L 0.42 0.68 L 0.51 0.52 Z',
          // // 3-4
          // //  path: 'M 0.50 0.49 L 0.46 0.72 L 0.52 0.5 Z',
          // // 4-5
          // // path: 'M 0.50 0.49 L 0.50 0.72 L 0.52 0.5 Z',
          // // 5-6
          // // path: 'M 0.50 0.51 L 0.54 0.72 L 0.52 0.5 Z',
          // // 6-7
          // // path: 'M 0.51 0.53 L 0.57 0.68 L 0.52 0.5 Z',
          // // 7-8
          // // path: 'M 0.51 0.53 L 0.60 0.62 L 0.52 0.5 Z',
          // // 8-9
          // // path: 'M 0.52 0.53 L 0.63 0.55 L 0.52 0.5 Z',

          fillcolor: 'red',
          line: {
            width: 0.4
          },
        }
    ],
    }
  Plotly.newPlot('gauge', gauge_data, gauge_layout);

};


d3.json("samples.json").then((importedData) => {
  data = [importedData];
  // Seperate the data into different arrays of metadata, names, and sample data
  metadata = data.map(entry => entry.metadata)[0];
  names = data.map(entry => entry.names)[0];
  samples = data.map(entry => entry.samples)[0];
  // Assign each test subject id to the select dropdown menu
  var sample_ids = samples.map(entry => entry.id);
  var selector = d3.select("#selDataset");
  sample_ids.forEach((sample) => {
    selector
        .append("option")
        .text(sample)
        .property("value", sample);
  });
  optionChanged();

});
