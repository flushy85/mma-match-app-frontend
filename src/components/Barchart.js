import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { svg } from 'd3'

const Barchart = ({data}) => {

  const d3Container = useRef(null)

  const margin = {
    top: 40,
    right: 0,
    bottom: 10,
    left: 0
  }

  const h = 280 - margin.top - margin.bottom
  const w = 280 - margin.left - margin.right

  useEffect(
    () => {
      if (data && d3Container.current) {
        
        const svg = d3.select(d3Container.current)
          .attr("preserveAspectRatio", "xMinYMin meet")
          .attr("viewBox", "0 0 300 300")
          .classed("svg-content", true)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        
        
        let winLossMax = d3.max(data, (d) => d.value)

      // X axis
        let xScale = d3.scaleBand()
          .domain(data.map((d) => d.type))
          .range([0, w])
          .padding(.7)

      // Y scale (no axis)
        let yScale = d3.scaleLinear()
        .domain([0, winLossMax])
        .range([h, 0])          

        svg.selectAll("text")
          .data(data)
          .enter()
          .append("text")
          .text((d) => d.value)
          .attr("x", (d, i) => xScale(d.type) + (i * 4))
          .attr("y", (d) => yScale(d.value) - 5)
          .style('opacity', 0)

          
        svg.append('g')
          .attr('transform', `translate(0, ${h})`)
          .call(d3.axisBottom(xScale)
          .tickSize(0))
          .attr('class', 'xAxis')
          .attr('font-size', '1.1rem')
          .call(g => g.select(".domain")
          .remove())

      svg.selectAll('.tick text')
        .attr('y', 5)
        
          

      //Bars
        svg.selectAll('mybar')
          .data(data)
          .enter()
          .append('rect')
          .attr('class', 'winLossBar')
          .attr('width', xScale.bandwidth())
          .attr('x', (d, i) => xScale(d.type))
          .attr('height', (d) => h - yScale(0))
          .attr('y', (d) => yScale(0))
          .attr('fill', (d) => d.win ? "#84B838" : "#DC3545")

         
          
      
      // Animation of bars
        svg.selectAll("rect")
          .transition()
          .duration(800)
          .attr("y", (d) => yScale(d.value))
          .attr("height", (d) => h - yScale(d.value))
          .delay((d,i) => i*800)
      
      //text pop in 
        svg.selectAll('text')
          .transition()
          .duration(0)
          .style('opacity', 1)
          .delay((d, i) => 880 + (i * 800))
        

        svg.append('text')
          .attr('x', w / 2)
          .attr('y', -10)
          .attr('text-anchor', 'middle')
          .text((data[0].win ? 'Wins' : 'Losses'))
          .style('font-family', 'Alfa Slab One')
          .style('font-size', '1.5rem')        

      }
    },[data, d3Container.current])

    return (
      <svg
          className="d3-component"
          ref={d3Container}
      />
  );
}

export default Barchart