#!/usr/bin/env groovy

@Grapes( @Grab('org.ccil.cowan.tagsoup:tagsoup:1.2') )

import org.ccil.cowan.tagsoup.Parser

import java.math.RoundingMode;

String ENCODING = "UTF-8"

def cli = new CliBuilder(usage: 'files [url]')

def options = cli.parse(args)

String url = "https://drive.google.com/a/crux.design/embeddedfolderview?id=0B5k0-3AGRBIfQ0lGdmxxd3FYeDQ#grid"

println "Scraping ${url}..."

def parser = new XmlSlurper(new Parser() )

List files = []

String baseUrl = url.take(url.indexOf('/', url.indexOf('://')+3))

new URL(url).withReader (ENCODING) { reader ->
    def document = parser.parse(reader)
    int counter = 0
    document.'**'.findAll { it.@class == 'flip-entry' }.each{
      counter = counter+1
      Map file = [:]
      String id = it.@id.toString().replace('entry-','')
      file.slugId = counter
      file.permalinkImage = "http://drive.google.com/uc?export=view&id=${id}"
      file.url = "https://drive.google.com/file/d/${id}/view?pli=1"
      files << file

    }
}

//"mkdir -p out".execute()

File yaml = new File('files.yml')

files.each{ file ->
  yaml << "- slugId: ${file.slugId} \n"
  yaml << "  permaImage: ${file.permalinkImage}\n"
  yaml << "  col: \n"
  yaml << "  url: ${file.url}\n\n"
}

